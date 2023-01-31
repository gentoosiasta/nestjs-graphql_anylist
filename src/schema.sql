# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type Item {
  id: ID!
  name: String!
  quantityUnits: String
}

type User {
  id: ID!
  fullName: String!
  email: String!
  roles: [String!]!
  isActive: Boolean!
  lastUpdateBy: User
  password: String!
}

type AuthResponse {
  token: String!
  user: User!
}

type Query {
  revalidate: AuthResponse!
  users(roles: [validRoles!] = []): [User!]!
  user(id: ID!): User!
  items: [Item!]!
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
  quantity: Float!
  quantityUnits: String
}

input UpdateItemInput {
  name: String
  quantity: Float
  quantityUnits: String
  id: ID!
}