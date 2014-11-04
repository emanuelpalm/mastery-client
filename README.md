# Mastery

An HTML5 platform game where you take on the role as a wizard fighting the undead.

## Building

### Required Tools

The below listed binaries have to be installed on your computer in order to
build the Mastery project.

- git
- npm (node.js)
- POSIX tools (find, sed, awk, make, cp, mkdir, rm)

For your convenience, here is the proper installation command for __Ubuntu__:

```sh
$ sudo apt-get install git nodejs
```

### Development Environment (Optional)

If you lack a suitable development environment for editing .js files, then using
the following commands will install the Atom editor with some useful plugins for
you.

__Ubuntu:__
```sh
$ sudo add-apt-repository ppa:webupd8team/atom
$ sudo apt-get update
$ sudo apt-get install atom
$ apm install jsformat linter linter-jshint
```

## Commands

To list all available build commands, use the following command in the project
root folder:

```sh
$ make help
```
