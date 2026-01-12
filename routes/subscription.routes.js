import { Router } from "express";

const subcriptionRouter = Router();

subcriptionRouter.get('/',(req, res) => res.send({title: "ger All subscriptions"}))
subcriptionRouter.get('/:id',(req, res) => res.send({title: "get subscription details"}))
subcriptionRouter.post('/',(req, res) => res.send({title: "create subscription"}))
subcriptionRouter.put('/:id',(req, res) => res.send({title: "update subscription"}))
subcriptionRouter.delete('/:id',(req, res) => res.send({title: "delete subscription"}))
subcriptionRouter.get('/user/:id',(req, res) => res.send({title: "get All user subscriptions"}))
subcriptionRouter.get('/:id/cancel',(req, res) => res.send({title: "cancel subscription"}))
subcriptionRouter.get('/upcoming-renewals',(req, res) => res.send({title: "get upcoming renewals"}))

export default subcriptionRouter;