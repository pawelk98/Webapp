import router from '../router'
import io from 'socket.io-client'
import * as config from '../../../config'

type SocketIoType = ReturnType<typeof io>

interface IViewManager {
  changeView(): void
  checkStatus(): void
  stopCheckingStatus(): void
}
type SetIntervalType = ReturnType<typeof setInterval>

class ViewManager implements IViewManager {
  private status = ''
  private socket: undefined | SocketIoType

  changeView() {
    switch (this.status) {
      case 'CONNECTED':
        router.push({ name: 'connected' })
        break
      case 'FAILED':
        router.push({ name: 'failed' })
        break
      case 'ANSWERED':
        router.push({ name: 'answered' })
    }
  }
  checkStatus() {
    this.socket = io(config.api.url, {
      reconnection: false,
      transports: ["websocket", "polling"],
      path: config.api.prefix + '/socket'
    });
    this.socket.on('status', (status) => {
        console.log(status)
        this.status = status
        this.changeView()
    })
  }
  stopCheckingStatus() {
    this.socket?.close()
  }
}

export default new ViewManager()

