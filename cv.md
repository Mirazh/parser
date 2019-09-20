 
# Junior Developer Resume
 
 My name is **Yakubov Nikolay**.
 
### About me
 The purpose of my training is to acquire skills, knowledge and experience for
 working in the field of program development. The meaning of this life is to 
 learn as much as possible about this world. It takes a lot of time and money.
 To travel and develop, remote work suits me. And since I like programming, 
 I decided to combine business with pleasure. I am ready to study hard, work 
 overtime to achieve the desired result.

### My skills 
My skills are small. I learned:
 * *Java* 
 * *MySQL*
 * *JavaScript*
 * *HTML*
 * *CSS*
 * *Web-Socket*
 * *Git*

### Education

1. I graduated from the "Gomel Technical University named after Pavel
Osipovich Sukhoi" with a degree in Engineering Technology.
2. There I graduated from the magistracy.
3. In the 3rd year of study, I became interested in programming and 
signed up for training on the website [JAVARUSH.RU](https://javarush.ru/).
The subscription was valid for a year and I managed to reach level 19.
4. Also trained on the platform [SOLOLEARN](https://www.sololearn.com/).
5. In 2017, he attended JAVA WEB-APPLICATIONS courses at [EPAM](https://training.by/) company

During training, he worked on his project. Browser online game on jsp pages. 

<details> 
  <summary>Here is an example code for a game table: </summary>
  <p>
  
```
	package entity;
    
    import java.io.FileNotFoundException;
    import java.util.ArrayList;
    import java.util.Random;
    
    import entity.cards.*;
    import exceptions.HaveNoActionsException;
    
    public class Table {
        static private ArrayList <Table> tablesList = new ArrayList<Table>(); 
        private String name;
        private String password;
        private int maxPlayers;
        private int timer;
        private int numberNight; 
        private int etap;
        private	ArrayList <User> usersList;
        private	Action[] actionsList;
        private ArrayList<Card> cemetery;
        private ArrayList<Card> beforeStart;
        private boolean allReadyToPlay;
        private boolean gameEnd;
	
	public Table(String name, String password, int maxPlayers) throws FileNotFoundException {
		this.name = name;
		this.password = password;
		this.maxPlayers = maxPlayers;
		this.timer = 60;
		this.numberNight = 0;
		this.allReadyToPlay = false;
		this.usersList = new ArrayList<>();
		this.actionsList = new Action[15];
		this.cemetery = new ArrayList<>();
		this.etap = 0;
		cardBeforeStart();
		
	}
	
	public void obrabotka() throws HaveNoActionsException {
		for(int i =0; i <actionsList.length;i++) {
			Action act = actionsList[i];
			if (act != null) {
				act.getFrom().doAction(act.getTo());
				removeAction(i);
			}
		}
	}
	
	public void doActions() {
		for(int i=0;i<actionsList.length;i++) {
			//actionsList.get(i)
		}
	}

	
	public ArrayList<User> 	getUsersList() 	{	return usersList;		}
	public boolean addUsersList(User user) 	{	
		if (usersList.size()<maxPlayers) {
			usersList.add(user);
			user.setTable(this);
			return true;
		}
		return false;
	}
	public void deleteUser(User user) 	{
		usersList.remove(user);
		user.setTable(null);
		if(usersList.size() < 1) {
			tablesList.remove(this);
		}
	}
	
	public ArrayList<Card> getCemetery() {
		return cemetery;
	}
	public void addCemetery(Card card) 	{
		cemetery.add(card);
	}
	public void deleteCemetryAll() {
	    cemetery = new ArrayList<Card>();
	}
	public void deleteCemetry(Card card) {
	    cemetery.remove(card);
	}
	public static ArrayList<Table> getTablesList() 	{
	    return tablesList;	
	}
	public static void addTable(Table table){
		tablesList.add(table);
		System.out.println("add table");
	}
	
	public Action[] getActionsList() 	{	
	    return actionsList;
	}
	public void addAction(Action action, int pozition) 	{
		actionsList[pozition] = action;	
	}
	public void removeAction(int pozition) 	{
	    actionsList[pozition] = null;
	}
	public void removeActionsList() {
		actionsList = new Action[15];
	}
	
	public String getName() {	
	    return name;
	}
	public void setName(String name) {
	    this.name = name;
	}

	public String getPassword() {
		return password;	
	}
	public void setPassword(String password) {
	    this.password = password;
	}

	public int getMaxPlayers() 	{	
	    return maxPlayers;	
	}
	public void setMaxPlayers(int maxPlayers) {		
	    this.maxPlayers = maxPlayers;
	}

	public int getTimer() 	{
		return timer;			
	}
	public void setTimer(int timer) {
		this.timer = timer;		
	}

	public int getNumberNight()	{
		return numberNight;		
	}
	public void setNumberNight(int numberNight) {
		this.numberNight = numberNight;	
	}

	public int getEtap() 	{
		return etap;
	}
	public void nextEtap() 	{
		if(etap==0) etap++;
			else etap = etap==1?2:1;
	}

	public static Table getTableByName (String name) {
		for (Table table:tablesList) {
			if(table.getName().equals(name)) 
			return table;
		}
		return null;
	}
	
	public User getUserByName (String name) {
		for (User user:usersList) {
			if(user.getNikName().equals(name)) 
				return user;
		}
		return null;
	}
	
	public boolean isAllReadyToPlay() {
		boolean ready = true;
			if(usersList.size()==maxPlayers) {
				for(User user:usersList) {
					if(user.isReadyToPlay()==false) {
						ready = false;
						break;
					}
				}
			}
			else {
				ready = false;
			}
		allReadyToPlay = ready;
		return allReadyToPlay;
	}
	
	public void cardBeforeStart() throws FileNotFoundException {
		this.beforeStart.add(new Mafia());
    	this.beforeStart.add(new Mafia());
    	this.beforeStart.add(new Doctor());
    	this.beforeStart.add(new Police());
    	this.beforeStart.add(new Shot());
    	this.beforeStart.add(new NightWolf());
    	this.beforeStart.add(new Kamikadze());
    	this.beforeStart.add(new Ghost());
    	this.beforeStart.add(new Warloc());
    	this.beforeStart.add(new Shahid());
    	this.beforeStart.add(new Sudya());
    	this.beforeStart.add(new LoveQuine());
		
		switch(maxPlayers) {
		case 7: 
			this.beforeStart.add(new Maniac());
			this.beforeStart.add(new Man());
			break;
		case 8: 
			this.beforeStart.add(new Maniac());
			this.beforeStart.add(new Man());
			this.beforeStart.add(new Police());
			this.beforeStart.add(new Kamikadze());
			
			break;
		case 9: 
			this.beforeStart.add(new Maniac());
			this.beforeStart.add(new Police());
			this.beforeStart.add(new Kamikadze());
			this.beforeStart.add(new Vampire());
			this.beforeStart.add(new Man());
			this.beforeStart.add(new Man());
			break;
		case 10: 
			this.beforeStart.add(new Maniac());
			this.beforeStart.add(new Man());
			this.beforeStart.add(new Kamikadze());
			this.beforeStart.add(new Vampire());
			this.beforeStart.add(new Man());
			this.beforeStart.add(new Man());
			this.beforeStart.add(new Man());
			this.beforeStart.add(new Doctor());
			break;
		default: 
		    break;
	}}

	public void firstDay() {
		Random random = new Random();
		for (User user :usersList) {
			for(int i = 0; i<2;i++) {
				if(user.getCards().size()<2) {
					int numberCard = random.nextInt(beforeStart.size());
					Card card = beforeStart.get(numberCard-1);
					user.addCard(card);
					beforeStart.remove(card);
				}
			}
		}
		
		nextEtap();
	}
	
	public void day() {
		//zeroHill//
		Card docTarget = null;
		for(Action action:actionsList) {
			if(action.getFrom().getClass().equals(Doctor.class)) {
				docTarget = action.getTo();
			}	
		}
		for(User user:usersList) {
			if(user != docTarget.getUser()) {
				user.zeroHil();
			} 
		}
		//zeroHillEnd//
		
		
		
		nextEtap();
	}
	
	public void night() {
		nextEtap();
	}}
```
 </p>

</details>

### English Language

I studied English at school and bookstore.  I started to study it seriously
in 2018 thanks to the `LingoDeer` application and also to the YouTube channel
[ENGLISH LANGUAGE FOR PLAYLISTS](https://www.youtube.com/channel/UC_3oKG5Szq-m6Xz-MjRZgpw)
To consolidate the result, I attended  [English Around](https://englisharound.by) courses 
On the [EPAM](https://training.by/), I passed a test where I received an `A2 + level`.
In my free time, I communicate with native English speakers who studied Russian 
with the help of `WhatsApp` and `Speaky`.

