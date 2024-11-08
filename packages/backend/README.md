# Shared Backend

This is the backend part of the monorepo. Database stuff and endpoints go here. As by the principle of modularization every module should have its own folder, containing its endpoints and its db-repository.

## Architecture

A endpoint should only contain http layer specific logic. If it requires domain logic this domain logic should be taken and specified in the shared package as a service. See:
