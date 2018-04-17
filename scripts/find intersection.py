keyDirectory = "C:\\Users\\Thomas\\Documents\\Spring 2018\\CSC495\\project\\Keys\\"

q11answer = "practical"
q12answer = "intellectual/tech-savvy"
q13answer = "classy"
q14answer = "social"
q15answer = "powerful"
q16answer = "unique"
q17answer = "adventurous/outdoorsy"
q2answer = "most money"
q3answer = "i live in my car"
q4answer = "city"
q5answer = "city"
q6answer = "function"
q7answer = "1-2"
q8answer = "night at home"
q9answer = "a little"

alreadyWritten = "false"

with open(keyDirectory + "all.txt") as file:
	finalList = file.readlines()
	
finalList = [x.strip() for x in finalList]
backupList = finalList
	
def processAnswer(answer, answers):

	answer = answer.lower()
	keyList = []
	
	for list in answers:
		if answer == list[0]:
			print("\n" + answer)
			length = len(list)
			for x in range(1, length):
				keyList.append(keyDirectory + list[x])
				print(list[x])
		
	for fileName in keyList:
		with open(fileName) as file:
			list = file.readlines()

		list = [x.strip() for x in list]

		global finalList
		finalList = set(list).intersection(finalList)	
		
def writeToFile():
	global alreadyWritten
	if alreadyWritten == "false":
		alreadyWritten = "true"
		finalFile = open(keyDirectory + "Final List.txt", "w")

		global finalList
		for item in finalList:
		 finalFile.write("%s\n" % item)
		
	 
def preventEmptyList():
	global finalList
	global backupList
	if len(finalList) == 0:
		finalList = backupList
		writeToFile()
	else:
		backupList = finalList
		
q11answers = [["adventurous/outdoorsy", "driven_vehicle_four_wheel_drive&all_wheel_drive.txt"],["unique", "popularity_0-873.txt"],["powerful", "engine_hp_350+.txt"],["intellectual/tech-savvy", "year_2016+.txt"],["socialite", "number_of_doors_4.txt"],["classy", "market_category_luxury+.txt"],["practical", "msrp_0-18485.txt"]]
	
q12answers = [["adventurous/outdoorsy", "driven_vehicle_four_wheel_drive&all_wheel_drive.txt"],["unique", "popularity_0-873.txt"],["powerful", "engine_hp_350+.txt"],["intellectual/tech-savvy", "year_2016+.txt"],["socialite", "number_of_doors_4.txt"],["classy", "market_category_luxury+.txt"],["practical", "msrp_0-18485.txt"]]

q13answers = [["adventurous/outdoorsy", "driven_vehicle_four_wheel_drive&all_wheel_drive.txt"],["unique", "popularity_0-873.txt"],["powerful", "engine_hp_350+.txt"],["intellectual/tech-savvy", "year_2016+.txt"],["socialite", "number_of_doors_4.txt"],["classy", "market_category_luxury+.txt"],["practical", "msrp_0-18485.txt"]]

q2answers = [["no money", "msrp_0-2252.txt"],["some money", "msrp_0-22995.txt"],["more money", "msrp_0-46430.txt"],["all the money", "all.txt"]]

q3answers = [["very little", "all.txt"],["some", "highway_mpg_18+.txt"],["a moderate amount", "highway_mpg_25+.txt"],["i live in my car", "highway_mpg_32+.txt"]]
	
q4answers = [["mountains", "driven_vehicle_four_wheel_drive&all_wheel_drive.txt", "engine_hp_350+.txt"],["beach", "vehicle_size_large.txt"],["city", "vehicle_size_compact.txt", "city_mpg_20+.txt"],["countryside", "highway_mpg_28+.txt"]]

q5answers = [["mountains", "driven_vehicle_four_wheel_drive&all_wheel_drive.txt", "engine_hp_350+.txt"],["small town", "highway_mpg_28+.txt"],["city", "vehicle_size_compact.txt", "city_mpg_20+.txt"],["countryside", "highway_mpg_28+.txt"]]

q6answers = [["function", "market_category_performance&high performance+.txt"],["fashion", "market_category_luxury+.txt"]]

q7answers = [["1-2", "vehicle_size_compact&midsize.txt"],["3-4", "vehicle_size_midsize&large.txt", "number_of_doors_4.txt"],["5+", "number_of_doors_4.txt", "vehicle_size_midsize&large.txt"]]

q8answers = [["night at home", "all.txt"],["out on the town", "popularity_1439+.txt"]]

q9answers = [["not at all", "all.txt"],["a little", "highway_mpg_21+.txt"],["above average", "market_category_flex fuel&hybrid+.txt", "highway_mpg_28+.txt"],["i hug trees", "market_category_flex fuel&hybrid+.txt", "highway_mpg_31+.txt"]]

processAnswer(q11answer, q11answers)
preventEmptyList()
processAnswer(q2answer, q2answers)
preventEmptyList()
processAnswer(q12answer, q12answers)
preventEmptyList()
processAnswer(q3answer, q3answers)
preventEmptyList()	
processAnswer(q4answer, q4answers)
preventEmptyList()
processAnswer(q5answer, q5answers)
preventEmptyList()
processAnswer(q6answer, q6answers)
preventEmptyList()
processAnswer(q7answer, q7answers)
preventEmptyList()
processAnswer(q8answer, q8answers)
preventEmptyList()
processAnswer(q9answer, q9answers)
preventEmptyList()
processAnswer(q13answer, q13answers)
preventEmptyList()

if alreadyWritten == "false":
	writeToFile()