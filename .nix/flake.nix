{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    nixpkgs_master.url = "github:NixOS/nixpkgs/master";
    systems.url = "github:nix-systems/default";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.systems.follows = "systems";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      ...
    }@inputs:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        mpkgs = import inputs.nixpkgs_master {
          inherit system;
          config.allowUnfree = true;
        };

        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
          overlays = import ./overlays { inherit system mpkgs; };
        };

        # General packages for your dev shell
        packages = (with pkgs; [
          pnpm
          nodejs_22
          # e.g, package-name
        ]);
        
      in
      with pkgs;
      {
        devShells = {
          default =
            mkShell {
              packages = packages;
              shellHook = ''
              '';
            };
        };
      }
    );
}