# 证书存储

在 C# 脚本中使用 `WebClient`、`WebRequest` 或其他 SSL/TLS 网络连接到第三方服务器时，可能会因 `TrustFailure` 而失败。这是因为默认情况下应用程序没有任何受信任的根证书颁发机构。以下教程展示了如何解决此问题。

### 无验证

解决此问题的一种方法是为你的游戏提供用于验证回调的受信任证书：

```cs
ServicePointManager.ServerCertificateValidationCallback +=
               delegate (object sender, System.Security.Cryptography.X509Certificates.X509Certificate certificate,
                                        System.Security.Cryptography.X509Certificates.X509Chain chain,
                                        System.Net.Security.SslPolicyErrors sslPolicyErrors)
{
    // TODO: 实现证书验证（例如，仅信任官方游戏服务器证书）
    return true; // **始终接受
};
```

***

### 证书存储插件

最好的解决方案是使用广泛受信任的根证书集合，例如由 Mozilla 提供的。下面的示例插件实现了在 `RawDataAsset` 中缓存受信任的根证书集合。在运行时，它从数据中加载证书并将其添加到根存储中，因此后续的 SSL 请求将基于这些证书进行验证。

请注意，首次启动插件将需要几秒钟，因为它会将最新的证书集合缓存到资源中（存储在 `Content/CertStore.flax` 中）。后续初始化通常需要 200-500ms。如果需要，你可以根据需要剥离证书列表以改善设置时间。

```cs
using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using FlaxEngine;
using Debug = FlaxEngine.Debug;

/// <summary>
/// 受信任证书存储工具。
/// </summary>
public sealed class CertStore : GamePlugin
{
    // 参考: https://github.com/mono/mono/blob/main/mcs/tools/security/mozroots.cs

    public CertStore()
    {
        // 初始化插件描述
        _description = new PluginDescription
        {
            Name = "Cert Store",
            Category = "Other",
            Description = "受信任证书存储工具。",
            Author = "Flax",
            AuthorUrl = "https://flaxengine.com/",
        };
    }

    /// <inheritdoc />
    public override void Initialize()
    {
        base.Initialize();

        var timer = Stopwatch.StartNew();

        // 获取数据
        var asset = InitAsset();
        if (asset == null || asset.WaitForLoaded())
        {
            Debug.LogError("Missing certificates store!");
            return;
        }
        var data = asset.Data;

        // 加载证书
        var roots = new X509Certificate2Collection();
        var sb = new StringBuilder();
        bool processing = false;
        using (var stream = new MemoryStream(data))
        {
            var reader = new StreamReader(stream);
            while (true)
            {
                string line = reader.ReadLine();
                if (line == null)
                    break;
                if (processing)
                {
                    if (line.StartsWith("END"))
                    {
                        processing = false;
                        var root = DecodeCertificate(sb.ToString());
                        roots.Add(root);
                        sb = new StringBuilder();
                        continue;
                    }
                    sb.Append(line);
                }
                else
                {
                    processing = line.StartsWith("CKA_VALUE MULTILINE_OCTAL");
                }
            }
        }
        if (roots.Count == 0)
        {
            Debug.Log("No certificates found.");
            return;
        }

        // 应用证书
        var store = new X509Store(StoreName.Root, StoreLocation.LocalMachine);
        store.Open(OpenFlags.ReadWrite);
        X509CertificateCollection trusted = store.Certificates;
        foreach (var root in roots)
        {
            if (!trusted.Contains(root))
                store.Add(root);
        }
        store.Close();

        timer.Stop();
        Debug.Log(string.Format("Cert Store initialized in {0} ms with {1} certs", timer.ElapsedMilliseconds, roots.Count));
    }

#if FLAX_EDITOR
    /// <inheritdoc />
    public override Guid[] GetReferences()
    {
        // 引用缓存的证书资源
        var asset = InitAsset();
        return new Guid[1] { asset.ID };
    }
#endif

    private RawDataAsset InitAsset()
    {
        var path = Path.Combine(Globals.ProjectContentFolder, "CertStore.flax");
        var asset = Content.LoadAsync<RawDataAsset>(path);
        if (asset == null)
        {
#if FLAX_EDITOR
            Debug.Log("Updating certificates store...");
            var callback = ServicePointManager.ServerCertificateValidationCallback;
            ServicePointManager.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;
            try
            {
                // 下载受信任证书集合
                var url = "https://hg.mozilla.org/releases/mozilla-release/raw-file/default/security/nss/lib/ckfw/builtins/certdata.txt";
                Debug.Log("Downloading certs from " + url);
                var req = (HttpWebRequest)WebRequest.Create(url);
                req.Timeout = 10000;
                var ms = new MemoryStream();
                req.GetResponse().GetResponseStream().CopyTo(ms);
                var data = ms.ToArray();
                Debug.Log("Got " + data.Length + " bytes");

                // 保存到文件
                var saver = Content.CreateVirtualAsset<RawDataAsset>();
                saver.Data = data;
                saver.Save(path);

                // 加载它
                asset = Content.LoadAsync<RawDataAsset>(path);
            }
            finally
            {
                // 恢复原始证书验证回调
                ServicePointManager.ServerCertificateValidationCallback = callback;
            }
            Debug.Log("Done.");
#endif
        }
        return asset;
    }

    private static X509Certificate2 DecodeCertificate(string s)
    {
        string[] pieces = s.Split('\\');
        byte[] data = new byte[pieces.Length - 1];
        for (int i = 1; i < pieces.Length; i++)
            data[i - 1] = (byte)((pieces[i][0] - '0' << 6) + (pieces[i][1] - '0' << 3) + (pieces[i][2] - '0'));
        return new X509Certificate2(data);
    }
}
```

***
