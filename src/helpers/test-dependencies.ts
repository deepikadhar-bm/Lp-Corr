// Test Dependency Manager
// Tracks test results to manage dependencies between tests

export class TestDependencyManager {
  private static testResults: Map<string, 'passed' | 'failed' | 'pending'> = new Map();

  // Mark a test as passed
  static markPassed(testName: string): void {
    this.testResults.set(testName, 'passed');
  }

  // Mark a test as failed
  static markFailed(testName: string): void {
    this.testResults.set(testName, 'failed');
  }

  // Check if a test passed
  static didTestPass(testName: string): boolean {
    return this.testResults.get(testName) === 'passed';
  }

  // Check if test exists in results
  static hasTestResult(testName: string): boolean {
    return this.testResults.has(testName);
  }

  // Get test result status
  static getTestResult(testName: string): 'passed' | 'failed' | 'pending' | undefined {
    return this.testResults.get(testName);
  }

  // Reset all results (useful for clean runs)
  static reset(): void {
    this.testResults.clear();
  }
}
