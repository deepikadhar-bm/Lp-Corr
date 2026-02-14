# Test Dependency Implementation Guide

## Overview
This guide explains how to set up test dependencies where `REG_TS19_TC01` must run before `REG_TS20_TC01`, and `REG_TS20_TC01` is skipped if `REG_TS19_TC01` fails.

**IMPORTANT:** Original test files remain UNCHANGED. A cloned version with dependency logic is used instead.

## Approach: Cloned Tests with Self-Contained State Management

### **Key Difference from Global Approach:**
- ✅ Original tests are NOT modified
- ✅ Original test-dependencies.ts is NOT used
- ✅ Dependency logic is self-contained in cloned file
- ✅ No impact on other test files
- ✅ Uses local JSON state file for tracking

### **File Structure**

**Original Files (UNCHANGED):**
- `reg_ts19_tc01_verify-if-there-is-more-than-one-company-associated-with-a-map-the-809.spec.ts` - Original test
- `reg_ts20_tc01_verify-in-the-popup-that-the-list-of-companies-associated-with-the-992.spec.ts` - Original test

**New Cloned File (WITH Dependencies):**
- `reg_ts19_ts20_with_dependencies.spec.ts` - Cloned versions with dependency management

### **How It Works**

1. **Prerequisite Test (REG_TS19)** runs first
   - Uses try-finally block to track execution
   - Writes pass/fail status to local JSON file: `.reg_ts19_ts20_state.json`
   - File is created in the same directory as the test

2. **Dependent Test (REG_TS20)** runs after
   - Checks the state file before starting
   - If prerequisite passed: continues with test execution
   - If prerequisite failed: calls `skip()` to skip the test
   - Appears as "skipped" in test report

3. **State File** (.reg_ts19_ts20_state.json)
   - Local file automatically created/deleted
   - Only stores state for this specific test dependency pair
   - Format:
   ```json
   {
     "reg_ts19_passed": true,
     "reg_ts19_failed": false,
     "timestamp": "2026-02-13T10:30:45.123Z"
   }
   ```

## How Test Execution Works

### Scenario 1: Both Tests Pass ✅
```
Test 1 (REG_TS19_TC01) starts
  ↓ Executes all steps
  ↓ Writes: { reg_ts19_passed: true } to state file
Test 2 (REG_TS20_TC01) starts
  ↓ Reads state file
  ↓ Prerequisite passed, so continues
  ↓ Executes all steps
Result: Both tests PASSED ✓
```

### Scenario 2: First Test Fails ❌
```
Test 1 (REG_TS19_TC01) starts
  ↓ Executes steps  
  ↓ Step fails
  ↓ finally block: Writes { reg_ts19_passed: false } to state file
Test 2 (REG_TS20_TC01) starts
  ↓ Reads state file
  ↓ Prerequisite failed, calls skip()
Result: Test 1 FAILED ❌, Test 2 SKIPPED ⊘
```

## Steps to Run Tests

### Run the New Cloned Test File with Dependencies

```bash
# Run the cloned test file with built-in dependency logic
npx playwright test tests/correspondant/reg_bid-maps/reg_ts19_ts20_with_dependencies.spec.ts

# Or run with a specific project
npx playwright test reg_ts19_ts20_with_dependencies.spec.ts --project=correspondant

# View detailed HTML report
npx playwright test reg_ts19_ts20_with_dependencies.spec.ts --reporter=html
npx playwright show-report
```

### Run Original Tests (Without Dependencies)

If you want to run the original tests without dependency logic:
```bash
# Run original tests separately
npx playwright test reg_ts19_tc01_verify-if-there-is-more-than-one-company...
npx playwright test reg_ts20_tc01_verify-in-the-popup-that-the-list-of-companies...

# Note: These will NOT have dependency logic - REG_TS20 will run regardless of REG_TS19 result
```

## Which Test File to Use?

| File | Use Case | Dependencies |
|------|----------|--------------|
| `reg_ts19_ts20_with_dependencies.spec.ts` | Want dependency behavior | ✅ YES - REG_TS20 skips if REG_TS19 fails |
| Original test files | Want independent tests | ❌ NO - Each runs separately |

## Features of the Cloned Test File

✅ **What Works:**
- Tests run in serial mode (enforced by Playwright config)
- REG_TS19 runs before REG_TS20 (same file, sequential order)
- If REG_TS19 fails, REG_TS20 is automatically skipped
- State is persisted in local JSON file (not in memory)
- Original test files remain completely unchanged
- No impact on other test files or test suites
- Works with single command execution

✅ **State Management:**
- Uses local file: `.reg_ts19_ts20_state.json` (temp file)
- Created in test directory during execution
- Automatically cleaned up with `test.beforeAll()`
- No global dependencies, fully isolated

⚠️ **Important:**
- Run the CLONED file, not the original files
- State file is only valid for tests in same run
- File is cleaned up before each test suite execution

## Test Report Output

When the cloned file runs, you'll see:

**When REG_TS19 passes:**
```
✓ REG_TS19_TC01_Verify if there is more than one company... (1.2s)
✓ REG_TS20_TC01_Verify in the popup that the list of companies... (0.8s)
```

**When REG_TS19 fails:**
```
✗ REG_TS19_TC01_Verify if there is more than one company... (0.5s)
  Error: Expected XYZ to be visible
⊘ REG_TS20_TC01_Verify in the popup that the list of companies... (skipped)
```

## Verification Checklist

✅ Cloned file created: `reg_ts19_ts20_with_dependencies.spec.ts`
✅ Original files NOT modified
✅ test-dependencies.ts NOT used
✅ Uses local state file for tracking
✅ try-finally block ensures state is always written
✅ skip() fixture used for conditional skipping
✅ Playwright config has `fullyParallel: false` and `workers: 1`

## Troubleshooting

**Issue:** Tests in cloned file seem to run in parallel
- **Solution:** Verify `playwright.config.ts` has:
  ```typescript
  fullyParallel: false,
  workers: 1,
  ```

**Issue:** State file not being created
- **Solution:** Check file system permissions. Ensure test has write access to directory.

**Issue:** REG_TS20 not skipping even though REG_TS19 failed  
- **Solution:** Verify `readTestState()` is being called correctly
  
**Issue:** Want to run original files with dependencies
- **Solution:** Keep using `reg_ts19_ts20_with_dependencies.spec.ts` 
  Original files are for running independently without dependency logic

## File Locations

```
playwright-tests/
├── tests/
│   └── correspondant/
│       └── reg_bid-maps/
│           ├── reg_ts19_tc01_...spec.ts (ORIGINAL - unchanged)
│           ├── reg_ts20_tc01_...spec.ts (ORIGINAL - unchanged)
│           └── reg_ts19_ts20_with_dependencies.spec.ts (NEW - with dependency logic)
│
└── src/
    └── helpers/
        └── test-dependencies.ts (NOT USED in cloned approach)
```

