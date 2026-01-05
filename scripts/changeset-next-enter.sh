#!/bin/bash

#
# Copyright © 2026 Lualtek Srl
# All rights reserved.
#
# This source code is proprietary and confidential.
# Unauthorized copying, modification, distribution, or use
# of this code, via any medium, is strictly prohibited.
#
# Developed by Mattia Astorino for Lualtek Srl
# https://lualtek.io
#

set -e

# This script is used to change the "baseBranch": "main" to "baseBranch": "[current_branch_name]" in the .changeset/config.json file

# Get the current branch name
current_branch=$(git branch --show-current)

# Check if the current branch not start with "next/" then exit
if [[ ! $current_branch =~ ^next/ ]]; then
  echo "You are not in a 'next/' branch"
  exit 1
fi

# Check if the .changeset/config.json file exists
if [ ! -f .changeset/config.json ]; then
  echo "The .changeset/config.json file does not exist"
  exit 1
fi

if ! command -v jq &> /dev/null; then
  echo "jq is not installed. Please install it and try again."
  exit 1
fi

baseBranch=$(jq -r '.baseBranch' .changeset/config.json)
if [[ "$baseBranch" != "main" ]]; then
  echo "The baseBranch is already set to a differnt branch than main: $baseBranch"
  exit 1
fi

# Change the "baseBranch": "main" to "baseBranch": "[current_branch_name]" in the .changeset/config.json file
jq --arg current_branch "$current_branch" '.baseBranch = $current_branch' .changeset/config.json > temp.json && mv temp.json .changeset/config.json


echo "The .changeset/config.json file has been updated successfully with the baseBranch: $current_branch:"
cat .changeset/config.json
