import sys

content = \"\"\"
  // [VAL_08] Negative Test: Subdomain Blocked when allow_subdomains is false
  // ---------------------------------------------------------------------------
  const candidateSubdomainBlocked = {
    ...candidateValid,
    candidate_id: "CAND-TEST-SUBDOMAIN-08",
    source_url: "https://promo.metiz.vn/"
  };
  const res8 = validateCandidate(candidateSubdomainBlocked, { domainCatalog: mockDomainCatalog });
  assertTest('VAL_08_NEGATIVE_SUBDOMAIN_BLOCKED', res8.valid === false,
    res8.errors.find(e => e.includes('domain_catalog')) || 'Subdomain rejected');

  // ---------------------------------------------------------------------------
  // [VAL_09] Negative Test: Shell Injection Prevention
  // ---------------------------------------------------------------------------
  const candidateShellInjection = {
    ...candidateValid,
    candidate_id: "CAND-TEST-SHELL-09",
    source_url: "https://example.com/promo\\\"; echo 'HACKED' > hacked.txt; \\\""
  };
  const res9 = validateCandidate(candidateShellInjection, { domainCatalog: mockDomainCatalog });
  assertTest('VAL_09_NEGATIVE_SHELL_INJECTION_BLOCKED', res9.valid === false, 
    res9.errors.find(e => e.includes('domain is not approved')) || 'Shell injection blocked');

  const hackedFile = path.join(__dirname, 'hacked.txt');
  if (fs.existsSync(hackedFile)) {
    console.error('  [VAL_09] CRITICAL FAILURE: Shell injection was executed!');
    fs.unlinkSync(hackedFile);
    allPassed = false;
  }

} finally {
  fs.rmSync(tempTestDir, { recursive: true, force: true });
}

// --- Summary ---
console.log('\\n' + (allPassed ? '??' : '?') + ' [VALIDATOR-TEST-SUMMARY] Toàn b? ' + (allPassed ? '9/9' : 'bài') + ' ki?m th? validator (bao g?m Negative Tests) ð? ' + (allPassed ? 'Ð?T [PASS]' : 'TH?T B?I [FAIL]') + '!');
if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
\"\"\"
with open('test_candidate_evidence_validator.js', 'a', encoding='utf-8') as f:
    f.write(content)
