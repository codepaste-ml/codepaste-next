// A simple language detection utility
// This is a basic implementation - you could use a more sophisticated library for better detection

export function detectLanguage(content: string): string {
  // Default to plaintext
  if (!content || content.trim() === "") {
    return "plaintext"
  }

  // Check for common language patterns
  if (content.includes("<?php")) {
    return "php"
  }

  if (content.includes("<html") || content.includes("<!DOCTYPE html")) {
    return "html"
  }

  if (content.match(/import\s+React|from\s+['"]react['"]|const\s+\w+\s*=\s*$$\s*$$\s*=>/)) {
    return "typescript"
  }

  if (content.match(/function\s+\w+\s*\(|const\s+\w+\s*=|let\s+\w+\s*=|var\s+\w+\s*=/)) {
    return "javascript"
  }

  if (content.match(/class\s+\w+|public\s+static\s+void\s+main/)) {
    return "java"
  }

  if (content.match(/def\s+\w+\s*\(|import\s+\w+|from\s+\w+\s+import/)) {
    return "python"
  }

  if (content.match(/#include\s*<|int\s+main\s*$$\s*$$/)) {
    return "cpp"
  }

  if (content.match(/SELECT|INSERT|UPDATE|DELETE|CREATE TABLE/i)) {
    return "sql"
  }

  if (content.match(/^\s*{|\[\s*{/)) {
    try {
      JSON.parse(content)
      return "json"
    } catch (e) {
      // Not valid JSON
    }
  }

  // Default to plaintext if no patterns match
  return "plaintext"
}
