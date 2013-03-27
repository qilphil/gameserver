ajax = {}
ajax.commands = content: (req, res, next) ->
  try

  catch exError
    console.log exError
  res.render "content",
    message: "Boo!"


exports.run = (req, res, next) ->
  command = req.params.command
  if ajax.commands[command]
    console.log "ajax command:", command
    ajax.commands[command] req, res, next
  else
    console.log "unknown ajax command:", command