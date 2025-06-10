import { Request, Response, Router } from "express";
import Order from "../models/order";
import User from "../models/user";

const router = Router();

router.post('/order', async (req, res) => {
  const data = new Order({
      paid: req.body.paid,
      total: req.body.total,
      created: new Date(),
      orderer: "mockuser",
      products: req.body.products
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({message: error})
  }
})

router.get('/order', async (req, res) => {
    try{
      const data = await Order.find();
      res.json(data)
    }
    catch(error){
      res.status(500).json({message: error})
    }
  })
  
router.get('/order/:id', async (req, res) => {
    try{
      const data = await Order.findById(req.params.id);
      res.json(data)
    }
    catch(error){
      res.status(500).json({message: error})
    }
  })


router.delete('/order/cancel/:id', async (req, res) => {
    try{
      const id = req.params.id;
      await Order.findByIdAndDelete(id);
      const data = await Order.find();
      res.send(data);
    }
    catch(error){
      res.status(500).json({message: error})
    }
  })

router.put('/order/update/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Order.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)
  }
  catch(error){
    res.status(500).json({message: error})
  }
})

export default router;