# JoinJSON

Receives one or mode JSON files and joins them into a single file.

Each file is captured as a Javascript object. There's no attempt to match elements in one object to those in another.

The script receives one argument, the path to a folder, and outputs a file called `manifest.json` to the same folder. It can be called either as a function or from the command line.

## Example

### File 1

```javascript
{
  "file": "1",
  "contents": [
    "a",
    "b"
  ]
}
```

### File 2

```javascript
{
  "file": "2",
  "contents": [
    "b",
    "c"
  ]
}
```

### Output

```javascript
[
  {
    "file": "1",
    "contents": [
      "a",
      "b"
    ]
  },
  {
    "file": "2",
    "contents": [
      "b",
      "c"
    ]
  }
]
```