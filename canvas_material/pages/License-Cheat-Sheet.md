*A quick reference for CS 301R. Not legal advice — for authoritative text, read the license itself and [choosealicense.com](https://choosealicense.com/).*

## The one-minute version

- **No license = all rights reserved.** If you don't add a `LICENSE` file, others legally *can't* use, copy, or modify your code — even if it's public on GitHub. To be open source, you must choose a license.
- **Permissive** (MIT, Apache-2.0, BSD): "do almost anything — just keep my copyright notice." Maximizes adoption.
- **Copyleft** (GPL, AGPL, LGPL, MPL): "use and modify freely, but if you distribute changes, keep them open under the same license." Keeps the ecosystem open.
- **Pick for your goal:** widest possible use (including companies)? → permissive. Improvements must stay open? → copyleft.

## Comparison

| License | Type | Use / modify / distribute | Derivatives must stay open? | Explicit patent grant? | Notice required? | Good for |
|---|---|---|---|---|---|---|
| **MIT** | Permissive | Yes | No | No | Yes | Max adoption, simplicity — a common default |
| **Apache-2.0** | Permissive | Yes | No | **Yes** | Yes (+ state changes) | Permissive *with* patent protection; enterprise-friendly |
| **BSD-3-Clause** | Permissive | Yes | No | No | Yes | Like MIT, but forbids using your name to endorse |
| **MPL-2.0** | Weak copyleft | Yes | Only the *modified files* | Yes | Yes | Middle ground; mixes with proprietary code |
| **LGPL-3.0** | Weak copyleft | Yes | The *library*, if modified | Yes | Yes | Libraries usable by closed-source apps |
| **GPL-3.0** | Strong copyleft | Yes | **Yes (whole work)** | Yes | Yes | Keep the whole project + derivatives open |
| **AGPL-3.0** | Strong copyleft (network) | Yes | **Yes, even when hosted** | Yes | Yes | Servers/SaaS you want kept open even when run remotely |
| **Unlicense / CC0** | Public domain | Yes | No | No | No | "Do whatever," no attribution needed |

## How to choose (fast)

1. **Want companies to use it freely?** → Permissive. Pick **Apache-2.0** if you want explicit patent protection, else **MIT**.
2. **Want improvements shared back?** → **GPL-3.0** (or **AGPL-3.0** if it runs as a network service).
3. **A library that even closed apps should use?** → **LGPL-3.0** or **MPL-2.0**.
4. **Don't care at all?** → **MIT** (friendliest default) or public domain (**CC0**).

## Gotchas

- **Add the `LICENSE` file at the start** — re-licensing later is hard once others contribute.
- **Your dependencies' licenses matter.** A GPL dependency can pull GPL obligations into your project (license *compatibility*).
- **Patent grant (the "patent grant?" column).** Code can be covered by patents *and* copyright. MIT/BSD grant copyright but are silent on patents — in theory a contributor could sue users over a patent on code they contributed. **Apache-2.0, GPL-3.0, and AGPL-3.0** add an *explicit patent grant* (each contributor licenses the patents needed to use their contribution; Apache also revokes your rights if you sue the project over a patent). It rarely bites small projects, but it's why companies favor Apache-2.0 — "permissive, with patent protection." *(General background, not legal advice.)*
- **You can't un-open released code** — people keep the version you gave them.
- **Open source isn't obligation-free for you** — you still owe maintenance, security fixes, and community time.

*Reference: [choosealicense.com](https://choosealicense.com/) · [tl;drLegal](https://www.tldrlegal.com/) · [OSI-approved licenses](https://opensource.org/licenses).*
