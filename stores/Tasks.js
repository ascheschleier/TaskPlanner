module.exports = store

function store (state, emitter) {
  state.taskCount = 2 
  state.tasks = []

  emitter.on('DOMContentLoaded', function () {
    emitter.on('task:add', function (_text) {
      console.log(_text)
      state.taskCount += 1
      var newTask = {type: 'task', text: _text, id: state.taskCount}
      state.tasks.push(newTask)
      emitter.emit(state.events.RENDER)
    })

    emitter.on('task:remove', function (taskNumber) {
      state.tasks[taskNumber].pop
      state.taskCount -= 1      
      emitter.emit(state.events.RENDER)
    })
  })
}