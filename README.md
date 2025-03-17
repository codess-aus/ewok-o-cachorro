# ewok-o-cachorro

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Troubleshooting

### Node.js v17+ Compatibility

If you encounter errors related to OpenSSL like:
```
'error:03000086:digital envelope routines::initialization error',
'error:0308010C:digital envelope routines::unsupported'
```

This is due to Node.js v17+ using OpenSSL 3.0 with more strict security defaults. The package.json has been updated to include a fix for this issue by setting the `NODE_OPTIONS=--openssl-legacy-provider` flag.

Alternatively, you can:

1. Set the environment variable manually before running commands:
   ```
   set NODE_OPTIONS=--openssl-legacy-provider  # Windows
   export NODE_OPTIONS=--openssl-legacy-provider  # Linux/macOS
   ```

2. Consider downgrading to Node.js v16 LTS if you experience other compatibility issues.
