{ mpkgs }:

self: super: { 
    pnpm = mpkgs.pnpm;
    nodejs_22 = mpkgs.nodejs_22;
}