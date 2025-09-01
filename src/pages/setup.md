---
sidebar_label: 'Setup'
sidebar_position: 4
---

# Setup

## VSCode

We will be using Visual Studio Code (VSCode) for Python assignments in this course. Download and install it here: https://code.visualstudio.com/

Do not enable the AI autocomplete -- it can harm students' learning at this stage, so it is not allowed for this course.

(You are allowed to use other IDEs if you prefer, but you will need to set up the extensions yourself, and we cannot guarantee support for it during office hours.)

## Python

We will use Python version 3.11 or higher in this course.
Please follow [VSCode's instructions for installing a Python interpreter that works with VSCode](https://code.visualstudio.com/docs/python/python-tutorial#_install-a-python-interpreter). (Note that the macOS default system install of Python is not supported, and you will need to install another version if you have macOS.)

## VSCode Extensions

### Python

There is an extension in VSCode that enables Python features such as the debugger: [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

How to set up the Python VSCode extension:

1. In VSCode, go to the "Extensions" tab on the left. It looks like this: <img width="36" height="38" alt="Four squares, one of which is slanted" src="https://github.com/user-attachments/assets/883c178f-f0c0-4cd3-ba41-3e8b6948b20f" />
2. Search for and install "Python"
   - Make sure that the extension's entire name is "Python" (not "Python Debugger")
   - The "Python" extension includes the debugger and a few other things.

### Pylint

We will use Pylint [(documentation here)](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint) to check that our code follows the style guidelines.
The autograder for each assignment will also be running Pylint.

How to set up the Pylint VSCode extension:

1. In VSCode, go to the "Extensions" tab on the left. Search for and install "Pylint"
2. Then, go to VSCode's Settings menu
   - Mac: `Code` > `Settings...` > `Settings`  (or `Cmd` + `,`)
   - Windows: `File` > `Preferences` > `Settings`  (or `Ctrl` + `,`)
3. Navigate to `Extensions` > `Pylint`
4. In the `Args` section, add these two args:
   - `--disable=import-error`
   - `--disable=assignment-from-no-return`

<img width="837" height="210" alt="Pylint args" src="https://github.com/user-attachments/assets/96079c7e-c218-42a6-a521-d7a15672e5ce" />



### MyPy

We will use MyPy [(documentation here)](https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker) to enforce Python's built-in type checking.
The assignment autograders will also be running MyPy.

How to set up the MyPy VSCode extension:

1. In VSCode, go to the "Extensions" tab on the left. Search for and install "Mypy Type Checker"
2. Then, go to VSCode's Settings menu
   - Mac: `Code` > `Settings...` > `Settings`  (or `Cmd` + `,`)
   - Windows: `File` > `Preferences` > `Settings`  (or `Ctrl` + `,`)
4. Navigate to `Extensions` > `Mypy Type Checker`
5. In the `Args` section, add these four args:
   - `--strict`
   - `--disallow-untyped-defs`
   - `--disable-error-code=empty-body`
   - `—-disable-error-code=return`
   - `--explicit-package-bases`

<img width="950" height="248" alt="MyPy args" src="https://github.com/user-attachments/assets/58d42d9a-6994-495f-9266-80fbf734c4ac" />



Now, any missing or mismatched types will be reported in the "Problems" tab every time you save or open a file:
   - Mac: `Cmd` + `Shift` + `M`
   - Windows: `Ctrl` + `Shift` + `M`

If MyPy is set up properly, then this code:

```python
def add(num1: int, num2) -> int:
    return num1 + num2

result: str = add(3, 'hi')

def func() -> int:
    pass
```

should result in three errors: `num2`'s missing type, `add()`'s returning something other than the promised `int`, and `result`'s value being an `int` when the variable type is `str`.

If there is an error about `func()` missing a return, then the arg `--disable-error-code=empty-body` was not specified correctly in the settings.

### Pandas and its MyPy type hints

[Pandas](https://pandas.pydata.org/) is a popular library for data analysis. We will use it to work with spreadsheets and tables in Python.

1. If this is your first time using Pandas, you will need to install it. To do that, in VSCode, go to the Terminal and execute the command `pip install pandas`.
2. Even if this is not your first time using Pandas, you may need to install the MyPy type hints for Pandas (which is a separate install). To do that, in VSCode, go to the Terminal and execute the command `pip install pandas-stubs`.

## Git and GitHub

### GitHub account

Sign up for a [GitHub account](https://github.com/) if you don't already have one. (While you could create a second account for this course, managing keys for multiple accounts is difficult, so we don't recommend it.)

We will be using git from the command line. Do not perform these operations with a GUI.

Be sure to use the same email address for your GitHub account and your computer's installation of git.

### git installation
- Windows:
  - First, install [Git for Windows](https://gitforwindows.org/). This includes Git Bash, which adds a Linux-like command line to Windows.
  - When it asks whether you would like to use a credential manager, say no (because we will be creating and managing keys ourselves). Otherwise, everything else should be the default option.
  - Once it is installed, pin it to your taskbar by:
    - Open `git-bash.exe` (which should be in `Local Disk (C:)` -> `Program Files` -> `Git`)
    - When it opens, right click on the icon in the Taskbar and select `Pin to taskbar`
  - Configure it to always open in your home directory by:
    - Right click on it in the Taskbar and then right click on `Git Bash`
    - Left click on `Properties`
    - In the `Target` section, click at the end of what's already entered (`"C:/Program Files/Git/git-bash.exe"`). After that last quotation mark, type in ` --cd-to-home` (including the space before the dashes)
    - Click `Apply`
- Mac or Linux:
  - Open the Terminal app and enter "git" to see if it is installed. If not, install it here: [1.5 Getting Started - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) ([Pro Git](https://git-scm.com/book/en/v2)).
  - You may have to deal with an [xcrun error](https://ma.ttias.be/mac-os-xcrun-error-invalid-active-developer-path-missing-xcrun/).

### git configuration
Then, open Git Bash or a terminal window and use these commands from [1.6 Getting Started - First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) ([Pro Git](https://git-scm.com/book/en/v2)) to configure git:
- `git config --global user.name "FirstName LastName"` (fill in your FirstName and LastName)
- `git config --global user.email email@northeastern.edu` (fill in the email address you used for GitHub)
- `git config --global init.defaultBranch main`
- `git config --list` (check that the output looks correct)

### Connect your GitHub account with your computer's installation of git
Here is a summary of the steps in [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent):

- Step 1: Open Git Bash (Windows) or the Terminal (Mac or Linux) and enter `ssh-keygen -t ed25519 -C "your_email@example.com"` (fill in your GitHub account email) to generate a new SSH key. We recommend using the default filename. Note: the characters will not appear as you are typing your password (it's invisible).
- Step 2 for Windows:
  - Open Windows PowerShell as administrator (right click on the app and click "Run as Administrator")
  - Enter this to start an SSH agent:
```
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```
  - Back in Git Bash, enter this: `ssh-add c:/Users/YOU/.ssh/id_ed25519` with the "YOU" replaced with your username (which you can see in the top of the Git Bash window, between `Users/` and `/.ssh`)
  - Then, still in Git Bash, copy the SSH public key to your clipboard: `clip < ~/.ssh/id_ed25519.pub`

- Step 2 for Mac or Linux:
  - In the Terminal, start an SSH agent by entering `eval "$(ssh-agent -s)"`
  - Edit the SSH config file to load keys into the agent by:
    - Check if the file exists (`open ~/.ssh/config`)
    - If it doesn't exist, create it (`touch ~/.ssh/config`)
    - Open the file `~/.ssh/config` and add this to the end of it:
```
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```
-
    - Add your SSH private key to the ssh-agent: `ssh-add --apple-use-keychain ~/.ssh/id_ed25519`
    - Copy the SSH public key to your clipboard: `pbcopy < ~/.ssh/id_ed25519.pub`

- Step 3 for everybody:
  - In a browser, go to github.com and log in. Then, in the upper-right corner, click your profile picture, then click `Settings`
  - In the `Access` section of the sidebar, click `SSH and GPG keys` and then `New SSH key` or `Add SSH key`
  - In the `Title` field, add a descriptive label for the new key that describes your laptop, such as "2025 MacBook Pro".
  - In the `Key` field, paste your public key, which should be on your clipboard from when you copied it earlier
  - Click `Add SSH key`
  - To test that it's working correctly, enter this at the command line: `ssh -T git@github.com`. The response should be a greeting containing your github username.

## Other recommended accounts to set up

Sign up for a [Khoury account](https://my.khoury.northeastern.edu/account/apply). After your account is approved, you can [access Khoury Admin here](https://admin.khoury.northeastern.edu/).

Sign up for an [O'Reilly Learning account](https://www.safaribooksonline.com/library/view/temporary-access/) for legal access to thousands of high-quality computing books (free to NU students, $49/month otherwise). You will need to click on "Institution not listed?"
