module Types
  class MutationType < Types::BaseObject
    field :complete_task, mutation: Mutations::CompleteTask
    field :delete_task, mutation: Mutations::DeleteTask
    field :upsert_task, mutation: Mutations::UpsertTask
  end
end
