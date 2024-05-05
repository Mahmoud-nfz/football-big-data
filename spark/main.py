import sched
import time
from src.batch.goal_scoring_players import goal_scoring_players
from src.batch.goal_scoring_teams import goal_scoring_teams
from src.batch.gpg_teams import gpg_teams

# If you want to add more functions to be run at specific intervals add them here with the desired interval in seconds
function_intervals = {
    goal_scoring_teams: 30,
    goal_scoring_players: 30,
    gpg_teams: 80
}


# Define a function to schedule a function to run periodically    
def periodic(scheduler, interval, action, actionargs=()):
    scheduler.enter(interval, 1, periodic, (scheduler, interval, action, actionargs))
    action(*actionargs)


def main():
    # Create a scheduler object
    scheduler = sched.scheduler(time.time, time.sleep)

    # Schedule the functions
    for func, interval in function_intervals.items():
        periodic(scheduler, interval, func)

    # Run the scheduler
    scheduler.run(blocking=True)

if __name__ == "__main__":
    main()
