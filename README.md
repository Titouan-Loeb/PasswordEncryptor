# Password encryptor
## Presentation
This extension is a secure password generation tool that creates strong, unique passwords based on three user-provided inputs:
- 2 customizable parameters
- 1 secret key

It is designed to help users generate strong, consistent passwords without storing any data. This tool creates a unique password by hashing your inputs with the SHA-256 algorithm and applying a set of transformations to ensure the result contains uppercase and lowercase letters, numbers, and special characters. The same input will always generate the same output — making it ideal for reproducible, site-specific passwords without the need for storage.

## How to use
1. Enter one or two parameters — these can represent the website, account type, or any other distinguishing detail (e.g., "amazon", "personal").
2. Enter a secret key — this acts as your private master key. Choose something memorable that you’ve never written down or shared. It can stay the same across all your accounts.
3. Click the “Copy” button to copy the generated password to your clipboard.
4. Paste the password into your login form or password manager.

## Example
To generate a password for your Amazon personal account, you might enter:
- 1st parameter: `amazon`
- 2nd parameter: `personal`
- Secret key: `my-private-key` (do not use this private key)

The tool will then generate a secure password you can paste directly into your Amazon login.

## Privacy Note
This extension does not store any of your data. All processing is done locally in your browser. Nothing is saved or transmitted — your inputs are used only for generating the output.

## Links
- You can find the extention in the [Chrome Web Store page](https://chromewebstore.google.com/detail/password-encryptor/dnkhokcbjomalffjhbfaaaajcckhdkaa)
- You can find also access it through the [website](https://titouan-loeb.github.io/PasswordEncryptor/)
