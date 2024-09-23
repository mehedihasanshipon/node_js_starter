import { Router } from 'express';
import invoiceRoute from './invoiceRoute';

const router = Router();

const defaultRoutes = [
    {
        path: '/invoice',
        route: invoiceRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
