module Mutations
  class CompleteTask < BaseMutation
    description 'Mark a task completed by id'

    argument :id, ID, required: true

    field :task, Types::TaskType, null: true
    field :errors, [String], null: true

    def resolve(id:)
      task = Task.find(id)
      task.assign_attributes(completed: true)

      if task.save
        { task: task }
      else
        { errors: task.errors.full_messages }
      end
    end
  end
end
