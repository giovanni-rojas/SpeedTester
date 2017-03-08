#ifndef _BAG_
#define _BAG_

typedef  int bag_type;

class Bag {

private:
   int count;     // members in bag
   bag_type *data;  //

public:
           Bag();             // Constructor
   bool    insert(bag_type);  // Put a member in the bag
   bool    remove(bag_type);  // remove a member from the bag
   int     size();            // number of members in bag
   void    clear();           // remove all members from bag
   bool    inbag(bag_type);   // is a member in the bag?
   int     howmany(bag_type); // how many member in bag.
   void printBag();
   void push(int vertex);
   void pop(int vertex);
};
#endif
