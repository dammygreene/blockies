"use client";

import makeBlockie from "ethereum-blockies-base64";
import Image from "next/image";
import { useMemo, useState } from "react";

const TOTAL_SUPPLY = 10_000;
const MINT_PRICE_ETH = 0.0005;
const MINT_PRICE = `${MINT_PRICE_ETH} ETH`;
const FALLBACK_ADDRESS = "0x000000000000000000000000000000000000dEaD";

type Palette = {
  primary: string;
  secondary: string;
  accent: string;
  soft: string;
};

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

const shorten = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const isAddress = (value: string) => /^0x[a-fA-F0-9]{40}$/.test(value);

const hashAddress = (address: string) =>
  address
    .toLowerCase()
    .replace("0x", "")
    .split("")
    .reduce((acc, char, index) => {
      const code = char.charCodeAt(0);
      return (acc * 31 + code * (index + 1)) >>> 0;
    }, 7);

const makePalette = (address: string): Palette => {
  const seed = hashAddress(address);
  const hue = seed % 360;
  const sat = 62 + (seed % 14);
  const primary = `hsl(${hue}deg ${sat}% 54%)`;
  const secondary = `hsl(${(hue + 42) % 360}deg ${sat - 4}% 48%)`;
  const accent = `hsl(${(hue + 188) % 360}deg ${sat + 2}% 60%)`;
  const soft = `hsl(${(hue + 296) % 360}deg ${sat - 18}% 36%)`;

  return { primary, secondary, accent, soft };
};

const getMintedWallets = () =>
  Object.keys(localStorage).filter((key) => key.startsWith("blockies-minted:"));

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [feedback, setFeedback] = useState("Connect your wallet to reveal your identity.");
  const [mintedCount, setMintedCount] = useState(() =>
    typeof window === "undefined" ? 0 : getMintedWallets().length,
  );

  const activeAddress = walletAddress || FALLBACK_ADDRESS;
  const blockieSrc = useMemo(() => makeBlockie(activeAddress), [activeAddress]);
  const palette = useMemo(() => makePalette(activeAddress), [activeAddress]);
  const hashSeed = useMemo(() => hashAddress(activeAddress), [activeAddress]);

  const identityTier = hashSeed % 100 > 92 ? "Rare resonance" : "Core identity";
  const density = 32 + (hashSeed % 45);
  const symmetry = 40 + ((hashSeed >> 3) % 57);
  const mintedKey = walletAddress ? `blockies-minted:${walletAddress.toLowerCase()}` : "";
  const alreadyMinted =
    typeof window !== "undefined" && mintedKey ? localStorage.getItem(mintedKey) === "1" : false;

  const connectWallet = async () => {
    if (!window.ethereum) {
      setFeedback("No injected wallet found. Install MetaMask or use a wallet-enabled browser.");
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts?.[0];

      if (!account || !isAddress(account)) {
        setFeedback("Connected account is invalid. Please switch to a valid Ethereum address.");
        return;
      }

      setWalletAddress(account);
      setFeedback("Wallet connected. Your blockie is ready to mint.");
    } catch {
      setFeedback("Wallet connection was cancelled or failed.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setFeedback("Wallet disconnected. Connect again to mint your wallet identity.");
  };

  const mintIdentity = async () => {
    if (!walletAddress) {
      setFeedback("Connect your wallet before minting.");
      return;
    }
    if (alreadyMinted) {
      setFeedback("This wallet has already minted. One wallet. One blockie.");
      return;
    }

    try {
      setIsMinting(true);
      setFeedback("Submitting demo mint transaction...");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem(mintedKey, "1");
      setMintedCount(getMintedWallets().length);
      setFeedback("Demo mint confirmed locally. Connect contract calls to mint onchain.");
    } catch {
      setFeedback("Mint failed. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        background: `radial-gradient(circle at 15% 20%, ${palette.primary}20, transparent 44%), radial-gradient(circle at 82% 15%, ${palette.accent}26, transparent 42%), linear-gradient(145deg, #06080f 6%, ${palette.soft} 120%)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:42px_42px]" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 pb-28 pt-8 md:px-8 lg:gap-20 lg:px-10">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border px-4 py-1 text-xs tracking-[0.26em] uppercase text-white/90">
              BLOCKIES · Ethereum Mainnet
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Your wallet already has a face. Mint it.
            </h1>
            <p className="max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              BLOCKIES is a wallet-identity mint. Connect once, preview your deterministic blockie,
              and claim the visual signature your address has carried from the start.
            </p>
            <div className="flex flex-wrap gap-3">
              {!walletAddress ? (
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="cursor-pointer rounded-full px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-65"
                  style={{ background: palette.accent }}
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </button>
              ) : (
                <button
                  onClick={disconnectWallet}
                  className="cursor-pointer rounded-full border px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Disconnect {shorten(walletAddress)}
                </button>
              )}
              <button
                onClick={mintIdentity}
                disabled={isMinting || !walletAddress || alreadyMinted}
                className="cursor-pointer rounded-full border px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(0,0,0,0.35)] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ borderColor: palette.primary }}
              >
                {alreadyMinted ? "Already Minted" : isMinting ? "Minting..." : `Mint for ${MINT_PRICE}`}
              </button>
            </div>
            <p className="text-sm text-white/70">{feedback}</p>
          </div>

          <div className="relative mx-auto w-full max-w-md rounded-3xl border bg-black/45 p-6 backdrop-blur-md">
            <div
              className="absolute -inset-px rounded-3xl opacity-55 blur-2xl"
              style={{ background: `linear-gradient(120deg, ${palette.primary}, ${palette.accent})` }}
            />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/60">
                <span>Live Identity Preview</span>
                <span>{identityTier}</span>
              </div>
              <div className="rounded-2xl border bg-black/40 p-4">
                <Image
                  src={blockieSrc}
                  alt="Wallet blockie preview"
                  width={224}
                  height={224}
                  unoptimized
                  className="mx-auto h-48 w-48 rounded-xl border border-white/20 shadow-2xl sm:h-56 sm:w-56"
                />
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-medium text-white">
                  {walletAddress ? shorten(walletAddress) : "Connect wallet to personalize"}
                </p>
                <p className="text-white/70">One wallet. One blockie. One identity.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Local Mints (Demo)"
            value={`${mintedCount.toLocaleString()} / ${TOTAL_SUPPLY.toLocaleString()}`}
          />
          <StatCard label="Remaining" value={`${Math.max(TOTAL_SUPPLY - mintedCount, 0).toLocaleString()}`} />
          <StatCard label="Mint Price" value={MINT_PRICE} />
          <StatCard label="Mint Rule" value="One per wallet" />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <InfoCard title="How it works">
            <ol className="space-y-2 text-sm text-white/80">
              <li>1. Connect your Ethereum wallet.</li>
              <li>2. Preview your deterministic blockie identity.</li>
              <li>3. Mint once for {MINT_PRICE} on Ethereum Mainnet.</li>
              <li>4. Keep your wallet face forever.</li>
            </ol>
          </InfoCard>
          <InfoCard title="Identity traits">
            <div className="space-y-2 text-sm text-white/80">
              <TraitRow name="Pattern Density" value={`${density}%`} />
              <TraitRow name="Symmetry Index" value={`${symmetry}%`} />
              <TraitRow name="Dominant Tone" value={palette.primary} />
              <TraitRow name="Status" value={alreadyMinted ? "Minted" : "Eligible"} />
            </div>
          </InfoCard>
        </section>

        <section className="rounded-3xl border bg-black/40 p-6 backdrop-blur-md sm:p-8">
          <h2 className="text-2xl font-semibold text-white">FAQ</h2>
          <div className="mt-5 grid gap-4 text-sm text-white/80 sm:grid-cols-2">
            <FaqItem question="What is a blockie?" answer="A deterministic pixel avatar generated from your wallet address." />
            <FaqItem question="Can I mint more than once?" answer="No. BLOCKIES enforces one mint per wallet identity." />
            <FaqItem question="Is each image unique?" answer="Yes. Each address maps to one deterministic blockie output." />
            <FaqItem question="What chain is this on?" answer="Ethereum Mainnet." />
          </div>
          <p className="mt-5 text-xs text-white/60">
            Note: this build currently demonstrates UI and local mint-state behavior. Contract integration is required
            for real onchain minting and global mint stats.
          </p>
        </section>
      </main>

      <button
        onClick={mintIdentity}
        disabled={isMinting || !walletAddress || alreadyMinted}
        className="fixed inset-x-4 bottom-4 z-20 rounded-full px-6 py-3 text-sm font-semibold text-black shadow-2xl md:hidden disabled:opacity-45"
        style={{ background: palette.accent }}
      >
        {alreadyMinted ? "Already Minted" : isMinting ? "Minting..." : `Mint for ${MINT_PRICE}`}
      </button>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-black/45 p-4 backdrop-blur-md">
      <p className="text-xs uppercase tracking-[0.2em] text-white/60">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-3xl border bg-black/40 p-6 backdrop-blur-md">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function TraitRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border bg-black/30 px-3 py-2">
      <span>{name}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="rounded-2xl border bg-black/30 p-4">
      <h3 className="font-medium text-white">{question}</h3>
      <p className="mt-2">{answer}</p>
    </article>
  );
}
