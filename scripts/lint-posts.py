"""Check posts against research/writing-brief.md.

Usage: python3 scripts/lint-posts.py . [slug ...]
With slugs, only those posts are checked. Exits 1 if any issue (lines starting with "!") is found.
Lines starting with "usa>" are Made in USA mentions for a human to check against products.json.
"""
import json, re, sys, pathlib

repo = pathlib.Path(sys.argv[1])
products = {p["id"]: p for p in json.loads((repo / "src/data/products.json").read_text())}
slugs = {p.stem for p in (repo / "src/content/posts").glob("*.mdx")}
static = {"how-to", "gear", "made-in-usa", "about", "contact", "affiliate-disclosure", "privacy", "fishing", "guides"}
hubs = {"bass", "crappie-panfish", "catfish", "trout-salmon", "pike-walleye", "ice", "inshore", "offshore"}
static |= {f"fishing/{h}" for h in hubs}
only = set(sys.argv[2:])
found = 0

bad_phrases = [
    r"\bI tested\b", r"\bwe tested\b", r"\bI've (fished|used|caught)\b", r"\blast (weekend|summer|spring)\b",
    r"\bstar rating", r"\b\d(\.\d)? stars\b", r"\breviews? on amazon\b", r"\bbest[- ]sell", r"\$\d",
    r"\bamazon's choice\b", r"\bprice[sd]? (is|are|at|around|under)\b", r"\bcustomers say\b",
]

for f in sorted((repo / "src/content/posts").glob("*.mdx")):
    if only and f.stem not in only:
        continue
    text = f.read_text()
    body = text.split("---", 2)[2]
    words = len(re.sub(r"<[^>]+>", " ", body).split())
    issues = []
    desc = re.search(r'^description:\s*"(.*)"\s*$', text, re.M)
    if desc and len(desc.group(1)) > 160:
        issues.append(f"description {len(desc.group(1))} chars")
    for pid in re.findall(r'<Product id="([^"]+)"', body):
        if pid not in products:
            issues.append(f"unknown product {pid}")
    for pat in bad_phrases:
        for m in re.finditer(pat, body, re.I):
            ctx = body[max(0, m.start() - 50): m.end() + 50].replace("\n", " ")
            issues.append(f"phrase '{m.group(0)}': ...{ctx}...")
    for link in re.findall(r"\]\((/[^)#]*)\)", body):
        s = link.strip("/")
        if s and s not in slugs and s not in static:
            issues.append(f"broken link {link}")
    # Made in USA mentions: list sentences so a human can check them
    usa = [m.group(0) for m in re.finditer(r"[^.\n]*(?:made in (?:the )?(?:usa|u\.s\.|america|united states)|american-made|assembled in)[^.\n]*", body, re.I)]
    print(f"\n== {f.name}: {words} words, {len(re.findall('<Product', body))} products, {len(re.findall('<Tip>', body))} tips")
    found += len(issues)
    for i in issues:
        print("  !", i)
    if usa and f.stem not in ("american-made-fishing-gear-guide",):
        for s in usa[:8]:
            print("  usa>", s.strip()[:160])

sys.exit(1 if found else 0)
