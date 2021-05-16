module Types
  class TaskType < Types::BaseObject
    description 'Representation of a task record'

    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: false
    field :due_date, String, null: false
    field :completed, Boolean, null: false
  end
end
