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
  items: [Item!]!
  password: String!
  itemCount: Int!
}

type Item {
  id: ID!
  name: String!
  quantityUnits: String
  user: User!
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