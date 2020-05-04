module.exports = store

function store (state, emitter) {
  state.user = {
    username: '',
    loggedIn: false
  }

  emitter.on('DOMContentLoaded', () => {
    emitter.on('user:login', (name) => {
      state.user.username = name
      state.user.loggedIn = true
      if (state.redirect) {
        state.redirect = false
        emitter.emit('pushState', state.redirectTarget)
      } else {
        emitter.emit('pushState', '/')
      }
      emitter.emit('render')
    })

    emitter.on('user:logout', () => {
      state.user.username = ''
      state.user.loggedIn = false
      emitter.emit('pushState', '/login')
      emitter.emit('render')
    })
  })
}
