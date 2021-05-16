module Mutations
  class DeleteTask < BaseMutation
    description 'Delete a task by id'

    argument :id, ID, required: true

    field :errors, [String], null: true

    def resolve(id:)
      task = Task.find(id)

      begin
        task.destroy!
      rescue StandardError => e
        return { errors: e.message }
      end

      { errors: nil }
    end
  end
end
