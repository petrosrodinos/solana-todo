# Next.js & Solana Smart Contract Setup

## Client

### Prerequisites

- Node.js (>= 16)
- Yarn or npm

### Install dependencies

```sh
cd solana-todo
npm install
```

### Run the development server

```sh
npm run dev
```

### Build for production

```sh
npm run build
npm start
```

---

## Solana Smart Contract (Anchor)

### Prerequisites

- Rust & Cargo
- Solana CLI
- Anchor CLI

### Install dependencies

```sh
cd anchor  # Navigate to the Anchor project directory
anchor build
```

### Deploy to a local validator

```sh
solana-test-validator &  # Start a local validator
anchor deploy
```

### Deploy to a Solana devnet

```sh
change cluster in ./Anchor.toml to 'Devnet'
anchor build
anchor deploy
```

### Run tests

```sh
anchor test
```

---

Now you're ready to develop and deploy your Next.js frontend alongside your Solana smart contract!
