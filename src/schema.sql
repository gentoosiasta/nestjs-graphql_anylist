# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type User {
  id: ID!
  fullName: String!
  email: String!
  roles: [String!]!
  isActive: Boolean!
  lastUpdateBy: User
  password: String!
  items(offset: Int = 0, limit: Int = 10, search: String): [Item!]!
  lists(offset: Int = 0, limit: Int = 10, search: String): [List!]!
  itemCount: Int!
  listCount: Int!
}

type List {
  id: ID!
  name: String!
  user: User!
  listItem: [ListItem!]!
  items(offset: Int = 0, limit: Int = 10, search: String): [ListItem!]!
  totalItems: Int!
}

type ListItem {
  id: ID!
  quantity: Float!
  completed: Boolean!
  item: Item!
  list: List!
}

type Item {
  id: ID!
  name: String!
  quantityUnits: String
  user: User!
  listItem: [ListItem!]!
}

type AuthResponse {
  token: String!
  user: User!
}

type Query {
  revalidate: AuthResponse!
  users(roles: [validRoles!] = []): [User!]!
  user(id: ID!): User!
  items(offset: Int = 0, limit: Int = 10, search: String): [Item!]!
  item(id: ID!): Item!
  lists(offset: Int = 0, limit: Int = 10, search: String): [List!]!
  list(id: Int!): List!
}

enum validRoles {
  admin
  user
  superUser
}

type Mutation {
  signup(signupInput: SignupInput!): AuthResponse!
  signin(signinInput: SigninInput!): AuthResponse!
  updateUser(updateUserInput: UpdateUserInput!): User!
  blockUser(id: ID!): User!
  createItem(createItemInput: CreateItemInput!): Item!
  updateItem(updateItemInput: UpdateItemInput!): Item!
  removeItem(id: ID!): Item!
  createList(createListInput: CreateListInput!): List!
  updateList(updateListInput: UpdateListInput!): List!
  removeList(id: ID!): List!
  createListItem(createListItemInput: CreateListItemInput!): ListItem!

  """Execute database construction"""
  executeSeed: Boolean!
}

input SignupInput {
  email: String!
  fullName: String!
  password: String!
}

input SigninInput {
  email: String!
  password: String!
}

input UpdateUserInput {
  email: String
  fullName: String
  password: String
  id: ID!
  roles: [validRoles!]
  isActive: Boolean
}

input CreateItemInput {
  name: String!
  quantityUnits: String
}

input UpdateItemInput {
  name: String
  quantityUnits: String
  id: ID!
}

input CreateListInput {
  name: String!
}

input UpdateListInput {
  name: String
  id: ID!
}

input CreateListItemInput {
  quantity: Float = 0
  completed: Boolean = false
  listId: ID!
  itemId: ID!
}