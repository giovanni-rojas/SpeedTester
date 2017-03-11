#include "bfs.c"
//#include "rundetails.cpp"
//#define getRandom() (drand48())

using namespace std;

//TODO
//gettime method
//elaspedtime method
//random permutation method
//generate edges
//has neighbors
//walk neighbor nodes
//vertex bag *splitandmergebag
//cilk_main



//change argument types to uint32_t if problems
int read_edge_list (int **tailp, int **headp) {
  int max_edges = 1000000;
  int nedges, nr, t, h;
  *tailp = (int *) calloc(max_edges, sizeof(int));
  *headp = (int *) calloc(max_edges, sizeof(int));
  nedges = 0;
  nr = scanf("%i %i",&t,&h);
  while (nr == 2) {
    if (nedges >= max_edges) {
      printf("Limit of %d edges exceeded.\n",max_edges);
      exit(1);
    }
    (*tailp)[nedges] = t;
    (*headp)[nedges++] = h;
    nr = scanf("%i %i",&t,&h);
  }
  return nedges;
}

//change argument types to uint32_t if problems
graph *graph_from_edge_list (int *tail, int* head, int nedges) {
  graph *G;
  int i, e, v, maxv;
  G = (graph *) calloc(1, sizeof(graph));
  G->ne = nedges;
  maxv = 0;

  // count vertices
  for (e = 0; e < G->ne; e++) {
    if (tail[e] > maxv) maxv = tail[e];
    if (head[e] > maxv) maxv = head[e];
  }
  G->nv = maxv+1;
  G->nbr = (int *) calloc(G->ne, sizeof(int));
  G->firstnbr = (int *) calloc(G->nv+1, sizeof(int));

  // count neighbors of vertex v in firstnbr[v+1],
  for (e = 0; e < G->ne; e++) G->firstnbr[tail[e]+1]++;

  // cumulative sum of neighbors gives firstnbr[] values
  for (v = 0; v < G->nv; v++) G->firstnbr[v+1] += G->firstnbr[v];

  // pass through edges, slotting each one into the CSR structure
  for (e = 0; e < G->ne; e++) {
    i = G->firstnbr[tail[e]]++;
    G->nbr[i] = head[e];
  }
  // the loop above shifted firstnbr[] left; shift it back right
  for (v = G->nv; v > 0; v--) G->firstnbr[v] = G->firstnbr[v-1];
  G->firstnbr[0] = 0;
  return G;
}

void print_CSR_graph (graph *G) {
  int vlimit = 20;
  int elimit = 50;
  int e,v;
  printf("\nGraph has %d vertices and %d edges.\n",G->nv,G->ne);
  printf("firstnbr =");
  if (G->nv < vlimit) vlimit = G->nv;
  for (v = 0; v <= vlimit; v++) printf(" %d",G->firstnbr[v]);
  if (G->nv > vlimit) printf(" ...");
  printf("\n");
  printf("nbr =");
  if (G->ne < elimit) elimit = G->ne;
  for (e = 0; e < elimit; e++) printf(" %d",G->nbr[e]);
  if (G->ne > elimit) printf(" ...");
  printf("\n\n");
}

void bfs (int s, graph *G, int **levelp, int **nlevelsp, int **levelsizep, int **parentp, double *edge){
  
  int *level, *levelsize, *parent;
  int thislevel;
  int *queue, back, front;
  int i, v, w, e;
  levelsize = *levelsizep = (int *) calloc(G->nv, sizeof(int));
  level = *levelp = (int *) calloc(G->nv, sizeof(int));
  parent = *parentp = (int *) calloc(G->nv, sizeof(int));
  queue = (int *) calloc(G->nv, sizeof(int));
  VertexBag *thisBag = new VertexBag();

  //initially, queue is empty, all levels and parents are -1
  back = 0;   // position next element will be added to queue
  front = 0;  // position next element will be removed from queue
  for (v = 0; v < G->nv; v++) level[v] = -1;
  for (v = 0; v < G->nv; v++) parent[v] = -1;

  // assign the starrting vertex level 0 and put it on the queue to explore
  thislevel = 0;
  level[s] = 0;
  levelsize[0] = 1;
  //queue[back++] = s;
  thisBag->push(s);

  //loop over levels, then over vertices at this level, then over neighbors
  while (!thisBag->isEmpty()){ //while bag is not empty
    VertexBag *bag;
    levelsize[thislevel+1] = 0;

    //split and merge bags on different processes
    bag = cilk_spawn splitAndMergeBag(thisBag, 0, thisBag->size() -1; level, parent, thislevel, G);
    cilk_sync;

    free(thisBag);

    nedges += bag->getNedges();
    thisBag = bag;

    levelsize[thislevel+1] = thisBag->size();
    thislevel = thislevel + 1;
  }

  *nlevelsp = thislevel;
  //free(queue);
  *nedgest = nedges;
}
