# BLOCKIES

## Project Brief

BLOCKIES is a responsive, interactive Ethereum NFT mint site where each user mints the blockie generated from their own connected wallet address.

The core idea is simple: every Ethereum wallet already has a visual identity. BLOCKIES turns that identity into a collectible NFT.

This is not a random PFP collection. It is a wallet-identity mint.

Each NFT should be:
- Deterministically generated from the connected wallet address
- Unique to that wallet
- Mintable only once per wallet
- Visually recognizable as a blockie-style avatar
- Presented in a modern, premium, web3-native experience

The site should feel fast, clean, alive, and easy to use on mobile and desktop.

---

## Main Concept

The user connects their wallet and instantly sees their own blockie preview.

That blockie is generated from the wallet address and displayed inside an interactive mint experience.

The site should make users feel like:
- their wallet already has a face
- that face can be claimed as an NFT
- minting is personal, not random
- the collection is about identity, not speculation

The background colors, gradients, accent tones, and supporting visual elements should adapt to the blockie’s palette so the entire page feels connected to the user’s specific wallet identity.

Example behavior:
- The blockie image itself changes based on the wallet address
- The page background shifts to match the blockie’s dominant colors
- Cards, glow effects, and buttons subtly inherit those tones
- Rare-looking blockies can trigger stronger visual effects
- The entire UI should feel personalized to the connected wallet

---

## Product Goal

Build a mint site that is:
- responsive on all screen sizes
- highly interactive
- visually polished
- easy to understand instantly
- optimized for mint conversion
- aligned with Ethereum culture

The site should make minting feel like claiming a piece of onchain identity.

---

## Collection Rules

- Chain: Ethereum Mainnet
- Supply: 10,000
- Mint price: 0.0005 ETH
- Mint rule: one mint per wallet
- Each wallet can only mint its own blockie
- The NFT artwork must be tied to the minter’s wallet address
- No generic random minting
- No allowlist needed unless added later

---

## Visual Direction

The design should lean into:
- clean Ethereum-native aesthetics
- sharp spacing
- soft glow accents
- modern dark UI
- smooth motion
- pixel identity charm
- premium but playful energy

Suggested visual mood:
- dark background by default
- subtle grain or noise texture
- animated gradients based on the user’s blockie colors
- glowing mint button
- floating preview card
- crisp typography
- subtle grid or scanline patterns if they fit the style

The blockie itself should be the hero.

---

## Responsive Layout Plan

The site must work beautifully on mobile, tablet, and desktop.

### Desktop
- large hero section
- blockie preview on one side
- mint panel on the other side
- animated background effects
- stats section below
- roadmap and FAQ further down

### Tablet
- stacked hero and mint panel
- simplified spacing
- preview remains prominent
- controls stay easy to tap

### Mobile
- single-column layout
- large centered blockie preview
- compact mint card
- clear CTA button
- no clutter
- no tiny text
- sticky mint button if useful

The mobile version should not feel like a reduced desktop page. It should feel intentionally designed.

---

## Interactive Experience Requirements

The site should include interactive elements that make the mint feel alive.

### Required interactions
- Wallet connect/disconnect
- Live blockie preview after connect
- Dynamic background color shift based on blockie palette
- Hover and tap animations
- Mint button states
- Loading states
- Success state after mint
- One-wallet restriction feedback
- Trait preview or identity summary

### Nice-to-have interactions
- Smooth color transitions when switching wallets
- Animated glow around the blockie card
- Rare blockie highlight effects
- Cursor-following gradient on desktop
- Micro-interactions on buttons and cards
- Live rarity/identity score display
- Animated mint confirmation modal

The site should feel responsive to the user’s wallet in real time.

---

## Blockie Color and Background System

A major part of the site is the way the blockie influences the UI.

The app should extract the blockie’s dominant and accent colors and use them to theme the page dynamically.

### Color behavior
- Background gradient should reflect the blockie palette
- Card borders and glows should match the dominant color family
- Button highlights should adapt to the accent color
- Secondary UI elements should use muted shades from the same palette
- Different wallets should feel visually distinct

### Example rule
If the blockie has deep blue, purple, and cyan tones:
- the page background should tilt toward those tones
- the glow around the mint card should use that palette
- the CTA button should feel consistent with that identity

### Advanced behavior
- Some blockies may create stronger contrast and more striking layouts
- The site can detect brightness and adjust text readability automatically
- Light blockies should trigger darker overlay support
- Dark blockies should trigger brighter accent or border states

The goal is to make the whole page feel like it belongs to that wallet.

---

## Page Structure

### 1. Hero Section
The hero section should immediately explain the idea.

Include:
- brand name BLOCKIES
- short tagline
- wallet connect CTA
- blockie preview area
- short explanation of what the project is

Suggested message:
“Your wallet already has a face. Mint it.”

### 2. Live Preview Section
Show the connected wallet’s blockie.

Include:
- generated blockie image
- wallet address or shortened address
- blockie traits
- rarity or identity details
- mint eligibility status

### 3. Mint Section
This is the main conversion area.

Include:
- price: 0.0005 ETH
- one mint per wallet note
- mint button
- clear gas/transaction state
- warning if wallet already minted
- success feedback

### 4. How It Works Section
Explain the project simply.

Suggested steps:
- Connect wallet
- View your blockie
- Mint your identity
- Keep your wallet face forever

### 5. Collection Stats
Display live or semi-live stats such as:
- total minted
- remaining supply
- mint price
- one per wallet rule
- chain

### 6. FAQ Section
Common questions should be answered clearly.

Possible FAQs:
- What is a blockie?
- Why is this wallet-based?
- Can I mint more than once?
- Is the image unique to my wallet?
- What chain is it on?
- What happens after minting?

### 7. Footer
Include:
- social links
- contract info
- chain info
- copyright or project identity

---

## Design Tone

The tone should feel:
- confident
- minimal
- futuristic without being cold
- web3-native without being cheesy
- collectible without sounding hype-only
- personal and identity-driven

Avoid:
- cluttered layouts
- too many colors
- cheap neon overload
- generic NFT casino visuals
- overused futuristic UI patterns
- copy that sounds like a scam mint page

---

## Copy Direction

The copy should be short and sharp.

Examples of strong positioning lines:
- Your wallet already had a face.
- Mint the identity your wallet has carried from the start.
- One wallet. One blockie. One identity.
- Claim your onchain face.
- Your wallet is the art.

The copy should make the project feel personal and collectible.

---

## Suggested Features for the Build

### Core
- Wallet connection
- Blockie generation from wallet address
- Mint flow
- One mint per wallet enforcement
- Responsive design
- Dynamic theming from blockie colors

### Enhanced
- Trait extraction from the blockie
- Rarity scoring
- Animated preview card
- Smooth background transitions
- Mint confirmation modal
- Shareable post-mint screen
- Copy address button
- Social share button

### Future Add-ons
- ENS support
- Animated or rare blockie variants
- Profile page for minted holders
- Holder gallery
- Traits leaderboard
- Physical merch unlocks
- Claim page for minted users

---

## Technical Direction

Suggested stack:
- Next.js for the site
- Tailwind CSS for styling
- wagmi / RainbowKit for wallet connection
- blockie generation library for deterministic art
- smart contract on Ethereum Mainnet
- metadata approach that supports permanence and low maintenance

The UI should be built to feel smooth and modern.

The artwork logic should remain deterministic and tied to the wallet address.

---

## Smart Contract / Mint Logic Expectations

The site should assume the mint contract supports:
- one mint per wallet
- paid minting in ETH
- deterministic token identity from wallet address
- metadata or rendering linked to the minter’s wallet
- public sale flow

The frontend should prevent obvious bad interactions by:
- disabling mint if the wallet already minted
- showing clear error states
- displaying transaction progress
- showing success after confirmation

---

## User Experience Flow

1. User lands on the homepage
2. They instantly see the BLOCKIES concept
3. They connect a wallet
4. The page generates their personalized blockie
5. The UI theme adapts to that blockie
6. They review their identity preview
7. They mint their blockie NFT
8. The site shows a success state and ownership confirmation
9. They can share or view their minted identity

The experience should feel effortless.

---

## Build Priority Order

### Phase 1
- responsive homepage
- wallet connection
- blockie preview
- dynamic theming
- mint button
- one mint per wallet logic

### Phase 2
- trait extraction
- smooth animations
- rarity effects
- stats section
- FAQ and footer

### Phase 3
- share screen
- holder gallery
- advanced motion
- extra identity features

---

## Final Creative Direction

BLOCKIES should feel like the place where Ethereum wallets become visible identities.

The site should not just sell an NFT.
It should make the user feel like they are claiming a permanent visual signature of their wallet.

The best version of the project is simple, fast, personal, and memorable.

The whole site should communicate one idea:

**Your wallet already has a face. BLOCKIES lets you mint it.**

