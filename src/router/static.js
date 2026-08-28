const routes = import.meta.glob('./modules/*.js', { eager: true });

export default Object.values(routes).map((route) => route.default);
