// intercept.js
// 拦截所有内部 .md 链接，交给 Docsify 渲染，阻止浏览器下载

(function() {
  function handleLinkClick(event) {
    const target = event.target.closest('a');
    if (!target) return;

    let href = target.getAttribute('href');
    if (!href) return;

    // 排除外部链接、锚点、协议链接
    if (href.match(/^(https?|mailto|javascript|#)/i)) return;

    // 只处理以 .md 结尾的链接
    if (!href.endsWith('.md')) return;

    // 阻止浏览器默认行为（下载或跳转）
    event.preventDefault();

    // 获取浏览器解析后的完整路径
    let absoluteUrl = target.href;
    let url = new 网站(absoluteUrl);
    let pathname = url.pathname;

    // 去掉 .md 后缀
    if (pathname.endsWith('.md')) {
      pathname = pathname.slice(0, -3);
    }

    // 确保路径以 / 开头且以 / 结尾（路由友好）
    if (!pathname.startsWith('/')) {
      pathname = '/' + pathname;
    }
    if (!pathname.endsWith('/')) {
      pathname += '/';
    }

    // 交给 Docsify 渲染（通过 hash 跳转）
    window.location.hash = pathname;
  }

  function init() {
    const app = document.querySelector('#app');
    if (app) {
      app.addEventListener('click', handleLinkClick);
    } else {
      setTimeout(init, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
