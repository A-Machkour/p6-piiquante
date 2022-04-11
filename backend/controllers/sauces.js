const Product = require('../models/product');
const fs = require('fs');




exports.getAllSauces = (req,res) =>{
    Product.find({}).then(products => res.send(products)).catch(error => res.status(500).send(error));
}
exports.getSauceById=(req,res)=>{
    console.log(req.params);
    const id = req.params.id;
    Product.findById(id)
        .then(product => {
            console.log("le produit avec cet id: ",product);
            res.send(product);
        })
        .catch(error => res.status(500).send(error));
}
exports.createSauce= (req,res) =>{
    
    console.log({body : req.body});
    const sauce = JSON.parse(req.body.sauce);
    console.log("sauce",sauce);
    const product = new Product({
        ...sauce,
        likes:0,
        dislikes: 0,
        usersLiked:[],
        usersDisliked:[],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    });
    console.log('product',product);
    product.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ message:"err au save" + error }));
}
exports.deleteSauce=(req,res)=>{
    Product.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Product.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
}

exports.modifySauce=(req,res)=>{
    const isNewImage = req.file != null;
    console.log("new image?", isNewImage);
    let payload = modifyImage(req,isNewImage);
    Product.updateOne({ _id: req.params.id }, { ...payload, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}
function modifyImage(req,isNewImage){
    if (!isNewImage){
        return req.body;
    }
    const body = JSON.parse(req.body.sauce);
    body.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    return body;
}
exports.sauceLikes = (req, res, next) => {
    // LIKE
    switch (req.body.like) {
      case 1:
        Product.updateOne(
          { _id: req.params.id },
          { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
        )
          .then(() => res.status(200).json({ message: 'like !' }))
          .catch((error) => res.status(400).json({ error }));
        break;
      // Annulation du like / dislike
      case 0:
        Product.findOne({ _id: req.params.id })
          .then((sauce) => {
            if (sauce.usersLiked.includes(req.body.userId)) {
                Product.updateOne(
                { _id: req.params.id },
                { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
              )
                .then(() =>
                  res.status(200).json({ message: 'like / dislike canceled !' })
                )
                .catch((error) => res.status(400).json({ error }));
            }
            if (sauce.usersDisliked.includes(req.body.userId)) {
                Product.updateOne(
                { _id: req.params.id },
                {
                  $pull: { usersDisliked: req.body.userId },
                  $inc: { dislikes: -1 },
                }
              )
                .then(() =>
                  res.status(200).json({ message: 'like / dislike canceled !' })
                )
                .catch((error) => res.status(400).json({ error }));
            }
          })
          .catch((error) => res.status(404).json({ error }));
        break;
      // DISLIKE
      case -1:
        Product.updateOne(
          { _id: req.params.id },
          { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } }
        )
          .then(() => {
            res.status(200).json({ message: 'Dislike !' });
          })
          .catch((error) => res.status(400).json({ error }));
        break;
      default:
        console.log(error);
    }
  }