const BtpPlugin = require('ilp-plugin-btp')
const IlpPacket = require('ilp-packet')

const server = new BtpPlugin({
  listener: {
    port: 9000,
    secret: 'shh_its_a_secret'
  }
})

server.registerDataHandler((ilp) => {
  console.log('server got:', IlpPacket.deserializeIlpPacket(ilp))
  return IlpPacket.serializeIlpFulfill({
    fulfillment: Buffer.alloc(32),
    data: Buffer.from('hello world again')
  })
})

server.connect()