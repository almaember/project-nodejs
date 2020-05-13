exports.get_authority = (req, res) => {
  res.send({
    authority: req.session.authority,
  });
};