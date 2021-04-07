exports.handler = async function (event, context) {
  const { identity, user } = context.clientContext
  // Do stuff and return a response...

  await console.log(identity, user)
}
