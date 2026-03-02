#!/usr/bin/env python3
"""
Merge oxlint.json and oxlint-migrated.json with the following rules:
- oxlint.json takes precedence for all rules
- Add new rules from oxlint-migrated.json that don't exist in oxlint.json
- Group rules by prefix (@stylistic, typescript, import, etc.)
"""

import json
import sys

def merge_and_group(our_rules, migrated_rules):
    """Merge rules: our takes precedence, add new ones from migrated, then group by prefix"""
    merged = dict(our_rules)

    # Add new rules from migrated
    for key, value in migrated_rules.items():
        if key not in merged:
            merged[key] = value

    # Group by prefix
    groups = {}
    for key, value in merged.items():
        if '/' in key:
            group = key.split('/')[0]
        else:
            group = '__eslint-core'

        if group not in groups:
            groups[group] = {}
        groups[group][key] = value

    # Order
    group_order = ['__eslint-core', 'import', '@stylistic', 'typescript', 'react', 'jsx-a11y', 'unicorn', 'promise', 'node', 'storybook']

    result = {}
    for group in group_order:
        if group in groups:
            for key in sorted(groups[group].keys()):
                result[key] = groups[group][key]

    # Add remaining groups
    for group in sorted(groups.keys()):
        if group not in group_order:
            for key in sorted(groups[group].keys()):
                result[key] = groups[group][key]

    return result

def main():
    # Load files
    try:
        with open('oxlint.json') as f:
            our = json.load(f)
    except FileNotFoundError:
        print('❌ oxlint.json not found')
        sys.exit(1)

    try:
        with open('oxlint-migrated.json') as f:
            migrated = json.load(f)
    except FileNotFoundError:
        print('❌ oxlint-migrated.json not found')
        sys.exit(1)

    # Merge top-level rules
    if our.get('rules') or migrated.get('rules'):
        our['rules'] = merge_and_group(our.get('rules', {}), migrated.get('rules', {}))

    # Merge overrides
    for override in our.get('overrides', []):
        if override.get('rules'):
            migrated_override = None
            for m in migrated.get('overrides', []):
                if m.get('files') == override.get('files'):
                    migrated_override = m
                    break

            our_rules = override.get('rules', {})
            migrated_rules = migrated_override.get('rules', {}) if migrated_override else {}
            override['rules'] = merge_and_group(our_rules, migrated_rules)

    # Save
    with open('oxlint.json', 'w') as f:
        json.dump(our, f, indent=2)
        f.write('\n')

    print('✅ Merged and grouped rules by prefix')

if __name__ == '__main__':
    main()
