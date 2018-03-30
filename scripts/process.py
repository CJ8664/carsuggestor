#!/usr/local/bin/python3

"""Script to generate car suggestion based on the passed inputs."""

import json
import sys


def main():
    """Process the input and generate the output."""
    inputFile = sys.argv[1]
    with open(inputFile, 'r') as fileHandle:
        inputData = json.loads(fileHandle.read())

    # Do the Processing
    outputFile = sys.argv[1].split('.')[0] + '_result.json'
    with open(outputFile, 'w') as fileHandle:
        fileHandle.write('result')

    print('Result process for {}'.format(inputFile))
    sys.stdout.flush()

if __name__ == '__main__':
    main()
