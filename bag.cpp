#include "bag.h"
#include "math.h"
#include <string>
#include <fstream>
#include <iostream>


Bag::Bag()    // Constructor
{
   // set the initial state of the bag
  arrayLength = 128;
  bagSize = 0;
  bagArray = new int[arrayLength];
  counter = -1;
  heap = true;
  nedges = 0;
}

void Bag::clear()  // Clear the bag
{
   bagSize = 0;
}

bool Bag::inBag(bag_type value)  // Is a value in the bag?
{
   bool reply=false;
   int index;
   for(index=0; index<count && !reply; index++)
      if(data[index] == value)
	reply=true;
   return reply;
}

void VertexBag::printBag(){
	cout << "Bag: ";
	for (int i = 0; i <size() && i < 10; i++) {
		cout << bagArray[i] << ", ";
	}
	cout << "\n";
}

void VertexBag::push(int position) {
	int temp;
	int j = bagSize;

	if (bagSize == arrayLength){
		int *tempArray = new int[arrayLength * 2];
		for (int i = 0; i < arrayLength; i++){
			tempArray[i] = bagArray[i];
		}
		free(bagArray);
		bagArray = tempArray;
		arrayLength = arrayLength * 2;
	}

	bagArray[bagSize++] = vertex;

	while(j > 0 && bagArray[(j-1)/2] > position && heap) {
		temp = bagArray[(j-1)/2];
		bagArray[(j-1)/2] = bagArray[j];
		bagArray[j] = temp;
		i = (j-1)/2;
	}

}

int VertexBag::pop() {
	
        bagSize--;
	int root = 0;
	if (heap) {
		int min = bagArray[root];

		bagArray[root] = bagArray[bagSize];

		minHeapify(root);
		return min;
	}
	else {
		return bagArray[counter++];
	}
	

}

int VertexBag::rootValue() {
  if (bagSize == 0)
    return -1;
  else
    return bagArray[0];
}

void VertexBag::minHeapify(int i){
	int min;
	int left = (i+1)*2-1;
	int right = (i+1)*2;

	if (left < bagSize && bagArray[left] < bagArray[i]) {
		min = left;
	} else {
		min = i;
	}
	if (left < bagSize && bagArray[right] < bagArray[i]){
		min = right;
	}

	if (min != i) {
		int temp = bagArray[min];
		bagArray[min] = bagArray[i];
		bagArray[i] = temp;

		minHeapify(i);
	}

}

void VertexBag::mergeBags(Bag *bag){
	int *temp;
	temp = new int[bagSize + bag->size()];
	int i = 0;

	while (bagSize != 0){

		if(bag->rootValue() == rootValue() && !isEmpty() && !bag->isEmpty()){
			temp[i] = pop();
			bag->pop();
		}else if(!bag->isEmpty() && (bag->rootValue() < rootValue() || isEmpty())) {
			temp[i] =  bag->pop();
		}else if(rootValue() >= 0){
			temp[i] = pop();
		}
		i++;
	}

	free(bagArray);
	bagArray = temp;

	bagSize = i;
	counter = 0;
	nedges += bag->getNedges();

	heap = false;	
}
