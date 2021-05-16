module Mutations
  class UpsertTask < BaseMutation
    description 'Upsert a task with attributes'

    argument :id, ID, required: false
    argument :title, String, required: false
    argument :description, String, required: false
    argument :due_date, String, required: false

    field :task, Types::TaskType, null: true
    field :errors, [String], null: true

    def resolve(id:, title:, description:, due_date:)
      if id.present?
        task = Task.find(id)
      else
        task = Task.new
      end

      task.assign_attributes(
        title: title,
        description: description,
        due_date: due_date
      )

      if task.save
        { task: task }
      else
        { errors: task.errors.full_messages }
      end
    end
  end
end
