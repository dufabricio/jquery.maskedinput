feature("Uncompleted callback", function() {


	scenario('Empty field on load and checkonload option true',function(){
		var incompleted=false;
		given("an input with a incompleted callback", function(){
			input.mask("999",{incompleted:function(){incompleted=true;}});
		});

		when("No Type",function(){
			//Nothing
		});

		then("incompleted callback should be called",function(){
			expect(incompleted).toBeTruthy();
		});
		then("value should be correct",function(){
			expect(input).toHaveValue('');
		});
	});

	scenario('Empty field on load and checkonload option false',function(){
		var incompleted=false;
		given("an input with a incompleted callback", function(){
			input.mask("999",{checkonload: false, incompleted:function(){incompleted=true;}});
		});

		when("No Type",function(){
			//Nothing
		});

		then("incompleted callback should not be called",function(){
			expect(incompleted).toBeFalsy();
		});
		then("value should be correct",function(){
			expect(input).toHaveValue('');
		});
	});




	scenario('Wrong value to mask',function(){
		var incompleted=false;
		given("an input with a incompleted callback", function(){
			input.mask("999",{incompleted:function(){incompleted=true;}});
		});

		when("typing left to right",function(){
			input.mashKeys("12");
		});

		then("incompleted callback should be called",function(){
			expect(incompleted).toBeTruthy();
		});
		then("value should be correct",function(){
			expect(input).toHaveValue('12_');
		});
	});

	scenario('Deleting last character of incomplete mask',function(){
		var incompleted=false;
		given("an input with a incompleted callback", function(){
			input
			.mask("999",{completed:function(){completed=true;}})
			.mashKeys("123")
			.mashKeys(function(keys){keys.type(keys.backspace)});
		});

		when("moving cursor to last position and typing",function(){
			input.caret(1).mashKeys("3");
		});

		then("incompleted callback should not be called",function(){
			expect(incompleted).toBeFalsy();
		});

		then("value should be correct",function(){
			expect(input).toHaveValue('132');
		});

	});


});
