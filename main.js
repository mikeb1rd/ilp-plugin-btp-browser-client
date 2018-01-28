const BtpPlugin = require('ilp-plugin-btp')
const IlpPacket = require('ilp-packet')

const client = new BtpPlugin({
  server: 'btp+ws://mike:shh_its_a_secret@localhost:9000'
})

async function run() {
  
  await client.connect()
  
  client.registerDataHandler((ilp) => {
  	console.log('recieved packet: ', IlpPacket.deserializeIlpPacket(ilp))
  })
  
  const response = await client.sendData(IlpPacket.serializeIlpPrepare({
    amount: '10',
    expiresAt: new Date(),
    executionCondition: Buffer.alloc(32),
    destination: 'peer.example',
    data: Buffer.from('hello world')
  }))

  console.log('client got:', IlpPacket.deserializeIlpPacket(response))
}

run()