#!/usr/local/bin/python3

"""Script to generate car suggestion based on the passed inputs."""

import json
import psycopg2
import sys

keyDirectory = "public/keys/"
alreadyWritten = "false"
finalList = []
backupList = []

def processtext(text, texts):
    """."""
    text = text.lower()
    keyList = []

    for list in texts:
        if text == list[0]:
            # print("\n" + text)
            length = len(list)
            for x in range(1, length):
                keyList.append(keyDirectory + list[x])
                # print(list[x])

    for fileName in keyList:
        with open(fileName) as file:
            list = file.readlines()

        list = [x.strip() for x in list]

        global finalList
        finalList = set(list).intersection(finalList)


def writeToFile():
    """."""
    global alreadyWritten
    if alreadyWritten == "false":
        alreadyWritten = "true"

        outputFile = sys.argv[1].split('.')[0] + '_result.json'
        # print(outputFile)
        with open(outputFile, 'w') as fileHandle:
            global finalList
            for item in finalList:
                fileHandle.write("%s\n" % item)


def preventEmptyList():
    """Restore the result if current question eliminates all cars."""
    global finalList
    global backupList

    if len(finalList) == 0:
        finalList = backupList
        writeToFile()
    else:
        backupList = finalList


def main():
    """Process the input and generate the output."""
    global finalList
    global backupList

    inputFile = sys.argv[1]
    with open(inputFile, 'r') as fileHandle:
        inputData = json.loads(fileHandle.read())

    q11text = inputData['q11text']
    q12text = inputData['q12text']
    q13text = inputData['q14text']
    # q14text = inputData['q14text']
    # q15text = inputData['q15text']
    # q16text = inputData['q16text']
    # q17text = inputData['q17text']
    q2text = inputData['q2text']
    q3text = inputData['q3text']
    q4text = inputData['q4text']
    q5text = inputData['q5text']
    q6text = inputData['q6text']
    q7text = inputData['q7text']
    q8text = inputData['q8text']
    q9text = inputData['q9text']

    with open(keyDirectory + "all.txt") as file:
        finalList = file.readlines()

    finalList = [x.strip() for x in finalList]
    backupList = finalList

    q11texts = [["adventurous/outdoorsy",
                 "driven_vehicle_four_wheel_drive&all_wheel_drive.txt"],
                ["unique", "popularity_0-873.txt"],
                ["powerful", "engine_hp_350+.txt"],
                ["intellectual/tech-savvy", "year_2016+.txt"],
                ["socialite", "number_of_doors_4.txt"],
                ["classy", "market_category_luxury+.txt"],
                ["practical", "msrp_0-18485.txt"]]

    q12texts = [["adventurous/outdoorsy",
                "driven_vehicle_four_wheel_drive&all_wheel_drive.txt"],
                ["unique", "popularity_0-873.txt"],
                ["powerful", "engine_hp_350+.txt"],
                ["intellectual/tech-savvy", "year_2016+.txt"],
                ["socialite", "number_of_doors_4.txt"],
                ["classy", "market_category_luxury+.txt"],
                ["practical", "msrp_0-18485.txt"]]

    q13texts = [["adventurous/outdoorsy", "driven_vehicle_four_wheel_drive&all_wheel_drive.txt"], ["unique", "popularity_0-873.txt"], ["powerful", "engine_hp_350+.txt"],
                ["intellectual/tech-savvy", "year_2016+.txt"], ["socialite", "number_of_doors_4.txt"], ["classy", "market_category_luxury+.txt"], ["practical", "msrp_0-18485.txt"]]

    q2texts = [["no money", "msrp_0-2252.txt"], ["some money", "msrp_0-22995.txt"],
               ["more money", "msrp_0-46430.txt"], ["all the money", "all.txt"]]

    q3texts = [["very little", "all.txt"], ["some", "highway_mpg_18+.txt"],
               ["a moderate amount", "highway_mpg_25+.txt"], ["i live in my car", "highway_mpg_32+.txt"]]

    q4texts = [["mountains", "driven_vehicle_four_wheel_drive&all_wheel_drive.txt", "engine_hp_350+.txt"], ["beach",
                                                                                                            "vehicle_size_large.txt"], ["city", "vehicle_size_compact.txt", "city_mpg_20+.txt"], ["countryside", "highway_mpg_28+.txt"]]

    q5texts = [["mountains", "driven_vehicle_four_wheel_drive&all_wheel_drive.txt", "engine_hp_350+.txt"], ["small town",
                                                                                                            "highway_mpg_28+.txt"], ["city", "vehicle_size_compact.txt", "city_mpg_20+.txt"], ["countryside", "highway_mpg_28+.txt"]]

    q6texts = [["function", "market_category_performance&high performance+.txt"],
               ["fashion", "market_category_luxury+.txt"]]

    q7texts = [["1-2", "vehicle_size_compact&midsize.txt"], ["3-4", "vehicle_size_midsize&large.txt",
                                                             "number_of_doors_4.txt"], ["5+", "number_of_doors_4.txt", "vehicle_size_midsize&large.txt"]]

    q8texts = [["night at home", "all.txt"], [
        "out on the town", "popularity_1439+.txt"]]

    q9texts = [["not at all", "all.txt"],
                ["a little", "highway_mpg_21+.txt"],
                ["above average", "market_category_flex fuel&hybrid+.txt",  "highway_mpg_28+.txt"],
                ["i hug trees", "market_category_flex fuel&hybrid+.txt", "highway_mpg_31+.txt"]]

    processtext(q11text, q11texts)
    preventEmptyList()
    processtext(q2text, q2texts)
    preventEmptyList()
    processtext(q12text, q12texts)
    preventEmptyList()
    processtext(q3text, q3texts)
    preventEmptyList()
    processtext(q4text, q4texts)
    preventEmptyList()
    processtext(q5text, q5texts)
    preventEmptyList()
    processtext(q6text, q6texts)
    preventEmptyList()
    processtext(q7text, q7texts)
    preventEmptyList()
    processtext(q8text, q8texts)
    preventEmptyList()
    processtext(q9text, q9texts)
    preventEmptyList()
    processtext(q13text, q13texts)
    preventEmptyList()

    if alreadyWritten == "false":
        writeToFile()

    constr = "dbname='carsuggest' user='' host='localhost' password=''"
    try:
        with psycopg2.connect(constr) as conn:

            outputFile = sys.argv[1].split('.')[0] + '_result.json'
            carPolarityMap = {}

            with open(outputFile, 'r') as fileHandle:
                for line in fileHandle:
                    carData = line.strip().split('\t')
                    carMake = carData[0].lower()
                    carModel = carData[1].lower()

                    cur = conn.cursor()
                    qry = 'SELECT AVG(review_polarity) from reviews WHERE car_make = \'{}\' and car_model = \'{}\';'.format(carMake, carModel)
                    cur.execute(qry)
                    rows = cur.fetchall()
                    if not rows[0][0]:
                        carPolarityMap[carMake + '_' + carModel] = 0
                    else:
                        carPolarityMap[carMake + '_' + carModel] = rows[0][0]

            with open(outputFile, 'w') as fileHandle:
                json_data = json.dumps([x for x, y in sorted(carPolarityMap.items(), key=lambda x: -x[1])][:3])
                fileHandle.write(json_data)

    except Exception as exp:
        print(exp)


    print('SUCCESS: Result process for {}'.format(inputFile))
    sys.stdout.flush()


if __name__ == '__main__':
    main()
