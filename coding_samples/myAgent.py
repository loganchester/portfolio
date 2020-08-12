import numpy as np
import random


playerName = "myAgent"
nPercepts = 75  #This is the number of percepts
nActions = 7    #This is the number of actionss


class MyCreature:

    def __init__(self):
        # chromosome[0] = eat/herbivore
        # chromosome[1] = hunt/carnivore
        # chromosome[2] = run
        # chromosome[3] = friends
        # chromosome[4] = shelter
        # chromosome[5] = awareness
        # chromosome[6] = random
        self.chromosome = np.random.randint(8, size=7)


    def GetChromosome(self):
        return self.chromosome


    def SetChromosome(self, chromosome):
        self.chromosome = chromosome


    # Returns the direction a given target (i,j) is
    # 0 --> left
    # 1 --> up
    # 2 --> right
    # 3 --> down
    # 5 --> don't move (5 because actions[5] is eating)
    def Direction(self, init_i, init_j, tar_i, tar_j):
        result = None
        # target is left
        if tar_i < init_i:
            result = 0
        # target is right
        elif tar_i > init_i:
            result = 2
        # target is either up or down
        else:
            # target is up
            if tar_j < init_j:
                result = 1
            # target is down
            elif tar_j > init_j:
                result = 3
            # target is same as initial
            else:
                result = 5
        return result


    # return the point ((i,j) or (closest_i, closest_j) that is closer
    # and the number of steps it takes to get to this point
    def ClosestIndices(self, i , j, closest_i, closest_j, closest_steps):
        horz_steps = abs(2 - i)
        vert_steps = abs(2 - j)
        total_steps = horz_steps + vert_steps
        if total_steps < closest_steps:
            return i, j, total_steps
        else:
            return closest_i, closest_j, closest_steps


    # return the closest prey
    # awareness determines whether this creature takes into account:
    #   type of prey (friend or foe)
    #   size of prey
    def ClosestPrey(self, my_size, creature_map, awareness):
        closest_i = None
        closest_j = None
        closest_steps = 6
        for i in range(0, 5):
            for j in range(0, 5):
                if awareness < 4 and abs(creature_map[i, j]) > 0:
                    closest_i, closest_j, closest_steps = self.ClosestIndices(i, j, closest_i, closest_j, closest_steps)
                elif awareness >= 4 and awareness < 6 and creature_map[i, j] < 0:
                    closest_i, closest_j, closest_steps = self.ClosestIndices(i, j, closest_i, closest_j, closest_steps)
                elif awareness >= 6 and creature_map[i, j] < 0 and my_size > abs(creature_map[i, j]):
                    closest_i, closest_j, closest_steps = self.ClosestIndices(i, j, closest_i, closest_j, closest_steps)
        return closest_i, closest_j


    # return the closest enemy (different from closest prey in that
    # the creature should run away from this enemy)
    # awareness determines whether this creature takes into account:
    #   type of creature (friend or foe)
    #   size of enemy
    def ClosestEnemy(self, my_size, creature_map, awareness):
        closest_i = None
        closest_j = None
        closest_steps = 6
        for i in range(0, 5):
            for j in range(0, 5):
                if awareness < 4 and abs(creature_map[i,j]) > 0:
                    closest_i, closest_j, closest_steps = self.ClosestIndices(i, j, closest_i, closest_j, closest_steps)
                elif awareness >= 4 and awareness < 6 and creature_map[i,j] < 0:
                    closest_i, closest_j, closest_steps = self.ClosestIndices(i, j, closest_i, closest_j, closest_steps)
                elif awareness >= 6 and creature_map[i,j] < 0 and my_size < abs(creature_map[i,j]):
                    closest_i, closest_j, closest_steps = self.ClosestIndices(i, j, closest_i, closest_j, closest_steps)
        return closest_i, closest_j


    # return the closest friend
    # awareness determines whether this creature takes into account:
    #   type of creature (friend or foe)
    def ClosestFriend(self, creature_map, awareness):
        closest_i = None
        closest_j = None
        closest_steps = 6
        for i in range(0, 5):
            for j in range(0, 5):
                if awareness < 4 and abs(creature_map[i,j]) > 0:
                    closest_i, closest_j, closest_steps = self.ClosestIndices(i, j, closest_i, closest_j, closest_steps)
                elif awareness >= 4 and creature_map[i,j] > 0:
                    closest_i, closest_j, closest_steps = self.ClosestIndices(i, j, closest_i, closest_j, closest_steps)
        return closest_i, closest_j


    # return the closest shelter/wall
    def ClosestShelter(self, wall_map):
        closest_i = None
        closest_j = None
        closest_steps = 6
        for i in range(0, 5):
            for j in range(0, 5):
                if wall_map[i,j]==1:
                    closest_i, closest_j, closest_steps = self.ClosestIndices(i, j, closest_i, closest_j, closest_steps)
        return closest_i, closest_j


    # return the closest food/strawberry
    def ClosestFood(self, food_map):
        closest_i = None
        closest_j = None
        closest_steps = 6
        for i in range(0, 5):
            for j in range(0, 5):
                    if food_map[i,j] == 1:
                        closest_i, closest_j, closest_steps = self.ClosestIndices(i, j, closest_i, closest_j, closest_steps)
        return closest_i, closest_j


    def AgentFunction(self, percepts):

        actions = np.zeros((nActions))

        # extract different maps
        creature_map = percepts[:,:,0]
        food_map = percepts[:,:,1]
        wall_map = percepts[:,:,2]

        my_size = creature_map[2,2]

        my_chromo = self.GetChromosome()

        my_awareness = my_chromo[5]

        # a list of indices in the chromosome that have the max value
        # awareness only affects other genes, so don't include
        max_list = []
        max_index = my_chromo.argmax()
        max_value = my_chromo[max_index]
        for i in range(0, len(my_chromo)):
            if my_chromo[i] == max_value and i != 5:
                max_list.append(i)

        # loop through the max genes
        for gene in max_list:

            # eating is a max
            if gene == 0:
                food_i, food_j = self.ClosestFood(food_map)
                # there is food in the area
                if food_i is not None:
                    direction = self.Direction(2, 2, food_i, food_j)
                    actions[direction] += 1
                # no food in area, move random direction
                else:
                    actions[6] += 1

            # hunting is a max
            elif gene == 1:
                hunt_i, hunt_j = self.ClosestPrey(my_size, creature_map, my_awareness)
                # there is prey in the area
                if hunt_i is not None:
                    direction = self.Direction(2, 2, hunt_i, hunt_j)
                    actions[direction] += 1
                # no prey in area, move random direction
                else:
                    actions[6] += 1

            # running is max
            elif gene == 2:
                run_i, run_j = self.ClosestEnemy(my_size, creature_map, my_awareness)
                # there are predators in the area
                if run_i is not None:
                    direction = self.Direction(2, 2, run_i, run_j)
                    opp_direction = (direction + 2)%4
                    actions[opp_direction] += 1
                # no predators in area, stay still
                else:
                    actions[4] += 1

            # friendliness is a max
            elif gene == 3:
                friend_i, friend_j = self.ClosestFriend(creature_map, my_awareness)
                # there is a friend in the area
                if friend_i is not None:
                    direction = self.Direction(2, 2,friend_i, friend_j)
                    actions[direction] += 1
                # no friends in area, move random direction
                else:
                    actions[6] += 1

            # shelter is a max
            elif gene == 4:
                shelter_i, shelter_j = self.ClosestShelter(wall_map)
                # there is shelter in the area
                if shelter_i is not None:
                    direction = self.Direction(2, 2, shelter_i, shelter_j)
                    actions[direction] += 1
                # no shelter in area, move random direction
                else:
                    actions[6] += 1

            # random is a max
            elif gene == 6:
                actions[6] += 1

        # resolve multiple max
        max_action = actions.argmax()
        max_action_indices = []
        for i in range(0, len(actions)):
            if actions[i] == max_action:
                    max_action_indices.append(i)
        # choose random index to increase from multiple maximums
        if len(max_action_indices) > 1:
            random_action_index = random.choice(max_action_indices)
            actions[random_action_index] += 1

        return actions


# this function implements tournament selection for parents
# it takes in a list of all creatures in the population and their fitness
# and how many creatures it should select for the "tournament"
# it then selects the most fit parent from the tournament
def ParentSelection(creature_array, how_many):
    # pick "how_many" random parents
    parent_poss = random.choices(creature_array, k=how_many)
    fitness = []
    for i in range(0, len(parent_poss)):
        fitness.append(parent_poss[i][1])
    # sort the parents in ascending fashion based on fitness
    Sort(fitness, parent_poss, 0, how_many-1)
    parent = parent_poss.pop()
    return parent


# uses last element as pivot point, places this pivot in
# its correct location, and sorts other elements around
# this pivot
def Partition(fitness_array, creature_array, low, high):
    # index of smaller element
    i = (low - 1)
    pivot = fitness_array[high]
    for j in range(low, high):
        if fitness_array[j] <= pivot:
            # increment index of smaller element
            i = i + 1
            fitness_array[i], fitness_array[j] = fitness_array[j], fitness_array[i]
            creature_array[i], creature_array[j] = creature_array[j], creature_array[i]
    fitness_array[i + 1], fitness_array[high] = fitness_array[high], fitness_array[i + 1]
    creature_array[i + 1], creature_array[high] = creature_array[high], creature_array[i + 1]
    return (i + 1)


# sorts fitness and creature arrays
# implementation is quicksort
def Sort(fitness_array, creature_array, low, high):
    if low < high:
        # partitioning index
        part = Partition(fitness_array, creature_array, low, high)
        # sort elements before partition
        Sort(fitness_array, creature_array, low, part - 1)
        # sort elements after partition
        Sort(fitness_array, creature_array, part + 1, high)


# creates a new generation using:
#   fitness function
#   elitism
#   multi point crossover
#   mutation
#   tournament parent selection
def newGeneration(old_population):

    # length of every population throughout the game
    N = len(old_population)

    # Fitness for all agents
    fitness = np.zeros((N))

    # All agents and their fitness scores
    # [[agent, fitness], [agent, fitness],...]
    creatures = []

    # find out home many turns in game
    game_turns = 100 # default value for game turns
    for creature in old_population:
        if creature.alive:
            game_turns = creature.turn
            break

    # this is the fitness function as explained in the report
    for n, creature in enumerate(old_population):

        impact = creature.enemy_eats/2
        longevity = 2*(creature.turn/game_turns + creature.alive)
        intelligence = creature.strawb_eats/2
        dominance = creature.size/2

        fitness[n] = impact + longevity + intelligence + dominance

        creatures.append([creature, fitness[n]])

    new_population = list()

    # sort fitness and creatures using quicksort algorithm
    Sort(fitness, creatures, 0, N-1)

    # elitism using 2 elite individuals
    # obtain number of elite creatures (second argument in range)
    # desired and add them to the new population
    for i in range(0, 2):
        elite_creature = creatures[len(creatures)-1-i]
        new_population.append(elite_creature[0])

    # adding n-2 individuals to new population because we have introduced elitism
    # every iteration of this adds 2 individuals, and (N-1)//2 will ensure:
    #   correct number of individuals are added to new population for even N
    #   1 extra individual is added to new population for odd N
    # this is taken care of just before the return statement
    for n in range((N-1)//2):

        # obtain both parents using tournament selection
        parent_1 = ParentSelection(creatures, N//4)
        parent_2 = ParentSelection(creatures, N//4)

        # obtain chromosomes of both parents
        par_1_chromosome = parent_1[0].GetChromosome()
        par_2_chromosome = parent_2[0].GetChromosome()

        # length of a chromosome
        new_chromosome_len = len(par_1_chromosome)
        # arrays to hold the new chromosomes
        new_chromosome1 = np.zeros((new_chromosome_len))
        new_chromosome2 = np.zeros((new_chromosome_len))

        # multi point crossover indices
        # for a chromosome of length 7, we choose:
        #   cross_index1 = random int between 1 and 3
        #   cross_index2 = random int between 4 and 6
        cross_index1 = random.randint(1, new_chromosome_len//2)
        cross_index2 = random.randint(new_chromosome_len//2+1, new_chromosome_len-1)

        # multi point crossover
        for i in range(0, new_chromosome_len):
            if i < cross_index1:
                new_chromosome1[i] = par_1_chromosome[i]
                new_chromosome2[i] = par_2_chromosome[i]
            elif i >= cross_index1 and i < cross_index2:
                new_chromosome1[i] = par_2_chromosome[i]
                new_chromosome2[i] = par_1_chromosome[i]
            else:
                new_chromosome1[i] = par_1_chromosome[i]
                new_chromosome2[i] = par_2_chromosome[i]

        # introduce mutation with a less than 10% chance
        mutation = random.random()
        if mutation < 0.1:
            index = random.randint(0, 6)
            value = random.randint(0, 7)
            new_chromosome1[index] = value

        # create new creatures with new chromosomes
        new_creature1 = MyCreature()
        new_creature2 = MyCreature()
        new_creature1.SetChromosome(new_chromosome1)
        new_creature2.SetChromosome(new_chromosome2)
        # Add the new agent to the new population
        new_population.append(new_creature1)
        new_population.append(new_creature2)

    # avg fitness of old population
    avg_fitness = np.mean(fitness)

    # ensure population is same length as old population
    # off by 1 error for odd numbered populations
    while len(new_population) > N:
        new_population.pop()

    return (new_population, avg_fitness)
