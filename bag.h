#ifndef _BAG_
#define _BAG_

typedef int bag_type;

class Bag {

private:
   int bagSize;     // members in bag
   int arrayLength;
   bag_type *bagArray;  //

   int counter;
   double nedges;
   bool heap;
   
public:
   Bag();             // Constructor
   int size(){return bagSize;}// number of members in bag
   void clear();           // remove all members from bag
   bool inBag(bag_type);   // is a member in the bag?
   void printBag();        //print elements of bag        
   void push(bag_type);  //push new member into queue
   void pop();             //remove oldest queued member
   int rootValue();
   double getNedges(){ return nedges;}
   void addEdge(){ nedges++;}
   void minHeapify(int i);
   void mergeBags(Bag *bag);
   int elementAt(bag_type);
   bool isEmpty(){return size() == 0;}
   
};
#endif
