# Shared Backend

This is the backend part of the monorepo. Database stuff and endpoints go here. As by the principle of modularization every module should have its own folder, containing its endpoints and its db-repository.

## Architecture

A endpoint should only contain http layer specific logic. If it requires domain logic this domain logic should be taken and specified in the shared package as a service. See:

```ts
createEndpoint<undefined, UserResponse>("/user/readable", HttpMethod.GET, typeguard, (body) => {
  const user = UserRepository.readUser(body.email);
  if (PermissionsService.hasPermision(user, "read")) {
    return { user };
  } else {
    return createApiError(
      HttpStatusCode.FORBIDDEN_403,
      "1f14a397-2643-4cd0-a3e4-5a1fd3cdc627",
      "permission-insufficient",
    );
  }
});
```
